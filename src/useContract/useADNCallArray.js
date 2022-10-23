import { useContractReads } from "wagmi";

import ADNConnector from "./ADNConnector";

function useANDCallArray(arrayName, finder, from, to) {
  let listCall = []
  for(let i = from; i<=to; i++){
    listCall.push({
      ...ADNConnector,
      functionName: arrayName,
      args: [finder, i],
    })
  }

  const { data, isError, isLoading } = useContractReads({contracts:listCall});

  return { data, isError, isLoading };
}

export default useANDCallArray;
