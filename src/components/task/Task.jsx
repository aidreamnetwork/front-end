import { ethers } from "ethers";
import { useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";

import getTaskFullData from "../../useContract/useGetTaskFullData";
import useADNCall from "../../useContract/useADNCall";
import useEvent from "../../useContract/useEvent";
import "./task.scss";
import Bid from "../bids/Bid";
import { getIPFSLink } from "../../utils";
import { useNavigate } from "react-router-dom";

const TimeToEnd = ({ date }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    // Render a countdown
    return (
      <span>
        {completed ? "Overtime " : "Waitting "}
        {hours}:{minutes}:{seconds}
      </span>
    );
  };

  return <Countdown date={date} renderer={renderer} overtime={true} />;
};

const Task = ({ taskId }) => {
  const { address } = useAccount();
  const [taskIdToLoad, setTaskIdToLoad] = useState(taskId);
  const nagivate = useNavigate();

  useEvent("PostTask", (address, taskId, resultId) => {
    console.log("New Event", address, taskId?.toNumber(), resultId?.toNumber());
    setTaskIdToLoad(taskId?.toNumber());
    window.location.reload();
  });
  useEvent("PickResult", (sender, taskId, resultId) => {
    console.log("PickResult", sender, taskId?.toNumber(), resultId?.toNumber());
    setTaskIdToLoad(taskId?.toNumber());
    window.location.reload();

  });

  let { data, isError, isLoading } = getTaskFullData(taskIdToLoad);
  let { data: TTL_TASK } = useADNCall("TTL_TASK");
  let { data: TotalTask } = useADNCall("totalUserTaskCount", [address]);

  //Pick

  console.log(data);
  if (!data) return <></>;
  let {
    creator,
    taskData,
    resultCount,
    resultIds,
    miners,
    results,
    resolveTimes,
    tokenId,
  } = data;
  let startTime = new Date(taskData?.promptTime?.toNumber() * 1000);
  // let pickable = new Date() - startTime < TTL_TASK * 1000;
  let endTime = new Date(
    (taskData?.promptTime?.toNumber() + TTL_TASK?.toNumber()) * 1000
  );

  return (
    <div className="task">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="task-prompt">
            <div className="task-prompt-tile">
              <b>Prompt [No: {taskId}]</b>
            </div>
            <div className="task-prompt-content">{taskData.prompt}</div>

            <div className="task-prompt-footer">
              <div>
                <Link to={`/creator/${creator}`}>
                  <b>Creator</b> {creator}
                </Link>
              </div>
              <div>
                <b>Reward</b> {ethers.utils.formatEther(taskData.reward)} KLAY
              </div>
              <div>
                <b>Prompt time: </b>{" "}
                {new Date(
                  taskData.promptTime.toNumber() * 1000
                ).toLocaleString()}
              </div>
              <div>
                <b>Time to end: </b>
                <TimeToEnd date={endTime} />
              </div>
              <div>
                <b>Total result</b> {resultCount.toNumber()}/4
              </div>
            </div>
          </div>
          <div className="task-result">
            {Array.from({ length: 4 }, (e, i) => {
              if (i < resultCount.toNumber()) {
                return (
                  <Bid
                    key={i}
                    resultId={resultIds[i].toNumber()}
                    isPicked={taskData.resultPicked.toNumber() == resultIds[i].toNumber()}
                    img={getIPFSLink(results[i])}
                    miner={miners[i]}
                    time={new Date(
                      resolveTimes[i].toNumber() * 1000
                    ).toLocaleString()}
                    pickable={taskData.resultPicked.toNumber() == 0 && creator === address}
                    taskId = {taskId} 
                  />
                );
              } else {
                return (
                  <Bid key={i}
                    pickable={taskData.resultPicked.toNumber() == 0 && creator === address}
                    endtime={<TimeToEnd date={endTime} />}
                  />
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
