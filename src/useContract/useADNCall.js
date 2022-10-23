import { useContractRead } from "wagmi";

import ADNConnector from "./ADNConnector";

function useANDCall(funcName, params) {
  let dataArgs = {
    ...ADNConnector,
    functionName: funcName,
    args: params,
  };

  const { data, isError, isLoading } = useContractRead(dataArgs);

  return { data, isError, isLoading };
}

export default useANDCall;
