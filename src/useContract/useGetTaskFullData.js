import { useContractRead } from "wagmi";

import ADNHelper from "./ADNHelper";

function getTaskFullData(taskId) {
  let getTaskById = {
    ...ADNHelper,
    functionName: "getTaskFullData",
    args: [taskId],
  }

  const { data, isError, isLoading } = useContractRead(getTaskById);
  
  return { data, isError, isLoading };
}

export default getTaskFullData;
