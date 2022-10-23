import { ethers } from "ethers";
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractEvent,
} from "wagmi";
import { useDebounce } from "usehooks-ts";
import ADNConnector from "./ADNConnector";

function usePrompt(params) {
  let paramsDebounce = useDebounce(params, 500);
  const { config, error, isError } = usePrepareContractWrite({
    ...ADNConnector,
    functionName: "startTask",
    args: [paramsDebounce.prompt],
    overrides: {
      value: ethers.utils.parseEther(paramsDebounce.reward.toString()),
    },
  });

  return { config, error, isError };
}

export default usePrompt;
