import { useContractReads } from "wagmi";

import ADNConnector from "./ADNConnector";

function useGetTask(taskId) {
  let getTaskById = {
    ...ADNConnector,
    functionName: "Tasks",
    args: [taskId],
  };
  let getTaskOwner = {
    ...ADNConnector,
    functionName: "TaskToUser",
    args: [taskId],
  };

  let getTaskResultsCount = {
    ...ADNConnector,
    functionName: "getTaskResultsCount",
    args: [taskId],
  }

  let getTaskResult0 = {
    ...ADNConnector,
    functionName: "getTaskResult",
    args: [taskId,0],
  }

  let getTaskResult1 = {
    ...ADNConnector,
    functionName: "getTaskResult",
    args: [taskId,1],
  }
  let getTaskResult2 = {
    ...ADNConnector,
    functionName: "getTaskResult",
    args: [taskId,2],
  }
  let getTaskResult3 = {
    ...ADNConnector,
    functionName: "getTaskResult",
    args: [taskId,3],
  }

  let getTaskResultId0 = {
    ...ADNConnector,
    functionName: "TaskToResults",
    args: [taskId,0],
  }

  let getTaskResultId1 = {
    ...ADNConnector,
    functionName: "TaskToResults",
    args: [taskId,1],
  }
  let getTaskResultId2 = {
    ...ADNConnector,
    functionName: "TaskToResults",
    args: [taskId,2],
  }
  let getTaskResultId3 = {
    ...ADNConnector,
    functionName: "TaskToResults",
    args: [taskId,3],
  }

  const { data, isError, isLoading } = useContractReads({contracts:[getTaskById, getTaskOwner, getTaskResultsCount,getTaskResult0, getTaskResult1, getTaskResult2, getTaskResult3, getTaskResultId0, getTaskResultId1, getTaskResultId2, getTaskResultId3]});
  let result = [];
  let taskData = data[0];
  let owner = data[1];
  let resultCount = result[0]
  for(let i =0; i<4; i++){
    result[i].id=data[3+i];
    result[i].data = 
  }
  return { data, isError, isLoading };
}

export default useGetTask;
