import { ethers } from "ethers";
import { usePrepareContractWrite } from "wagmi";
import { useDebounce } from "usehooks-ts";
import ADNConnector from "./ADNConnector";


function usePick({taskId, resultId}) {
  let paramsDebounce = useDebounce({taskId, resultId}, 1000);
  let data = {
    ...ADNConnector,
    functionName: "pickResult",
    args: [paramsDebounce.taskId, paramsDebounce.resultId],
  };
  const { config, error, isError } = usePrepareContractWrite(data);

  return { config, error, isError };
}

export default usePick;
