import { useState } from "react";
import { toast } from "react-toastify";
import { useContractWrite, useWaitForTransaction, useContractEvent, useAccount } from "wagmi";
import Results from "../../components/result/Results";
import { BLOCK_EXPLORER } from "../../config";
import usePrompt from "../../useContract/usePrompt";
import "./prompt.scss";
import {ADN_Connector} from '../../config';
import useEvent from "../../useContract/useEvent";
import useCall from "../../useContract/useADNCall";
import { useNavigate } from "react-router-dom";

const Prompt = () => {
  let [reward, setReward] = useState(0.1);
  let [prompt, setPrompt] = useState("");
  let navigate = useNavigate();

  useEvent("StartTask", (address, taskId)=>{
    console.log("New Event", address, taskId);
    navigate('/task/'+ taskId.toNumber())

  })
  let {address} = useAccount();
  let { data: TotalTask } = useCall("totalUserTaskCount",[address]);
  let { data: LastTask } = useCall("getUserTask",[address, TotalTask?.toNumber()]);

  let {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrompt({ prompt, reward });

  const { data, error, isLoading: isLoadingWrite, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data){
      console.log('Success', data);

    }
  });

  
  return (
    <div>
    <div className="dream section__padding">
      <div className="create-container">
        <h1>Dream new image</h1>
        <form
          className="dreamForm"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            write?.();
          }}
        >
          <div className="formGroup">
            <label>Prompt</label>
            <textarea
              type="text"
              rows={2}
              placeholder="Decription of your item"
              onChange={(e) => setPrompt(e.target.value)}
              required
              value={prompt}
            />
          </div>
          <div className="formGroup">
            <label>Reward</label>
            <div className="twoForm">
              <input
                required
                type="number"
                min="0.1"
                placeholder="Price"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
              />
              <select>
                <option value="KLAY">KLAY</option>
              </select>
            </div>
          </div>

          <button disabled={!write || isLoading}>
            {isLoadingWrite || isLoading ? "Dreaming..." : "Dream"}
          </button>

          
        </form>
        <div className="dream-alert">
        {isSuccess && (
            <div>
              Successfully post your dream to blockchain
              <div>
                <a target="_blank" href={`${BLOCK_EXPLORER}tx/${data?.hash}`}>
                  View transaction detail
                </a>
              </div>
            </div>
          )}

          {isPrepareError && prepareError?.data && (
            <div>{prepareError?.data?.message}</div>
          )}
          {isError && <div>{error?.message.slice(0, 25)}</div>}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Prompt;
