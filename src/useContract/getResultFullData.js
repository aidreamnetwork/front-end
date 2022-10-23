import { useContractRead } from "wagmi";

import ADNHelper from "./ADNHelper";

function getResultFullData(resultId) {
  let getResultId = {
    ...ADNHelper,
    functionName: "getResultFullData",
    args: [resultId],
  }

  const { data, isError, isLoading } = useContractRead(getResultId);
  
  return { data, isError, isLoading };
}

export default getResultFullData;
