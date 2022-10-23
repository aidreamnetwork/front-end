import { ethers } from "ethers";
import { useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";

import getTaskFullData from "../../useContract/useGetTaskFullData";
import useADNCall from "../../useContract/useADNCall";
import useEvent from "../../useContract/useEvent";
import "./tasks.scss";
import BidReadOnly from "../bids/BidReadOnly";
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

const TaskReadOnly = ({ taskId }) => {
  const { address } = useAccount();
  const nagivate = useNavigate();

  let { data, isError, isLoading } = getTaskFullData(taskId);
  let { data: TTL_TASK } = useADNCall("TTL_TASK");

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

  const [showResult, setshowResult] = useState(false);
  return (
    <div className="task-readonly">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="task-readonly-prompt">
            <div className="task-readonly-prompt-title">
              <b>Prompt [No: {taskId}]</b>
            </div>
            <div className="task-readonly-prompt-content">
              {taskData.prompt}
            </div>

            <div className="task-readonly-prompt-footer">
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
              <div className="task-readonly-buttons">
                <div
                  className="task-readonly-buttons-button"
                  onClick={() => setshowResult(!showResult)}
                >
                  {showResult ? "Hide" : "Show"} results
                </div>
                <div
                  className="task-readonly-buttons-button"
                  onClick={() => nagivate("/task/" + taskId)}
                >
                  View task
                </div>
              </div>
            </div>
            {showResult ? (
              <div className="task-readonly-prompt-footer">
                <div className="task-readonly-result">
                  {Array.from({ length: 4 }, (e, i) => {
                    if (i < resultCount.toNumber()) {
                      return (
                        <BidReadOnly
                          key={i}
                          resultId={resultIds[i].toNumber()}
                        />
                      );
                    } else {
                      return <BidReadOnly key={i} />;
                    }
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskReadOnly;
