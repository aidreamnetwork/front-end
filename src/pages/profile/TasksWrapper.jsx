import React from "react";
import Tasks from "../../components/tasks/Tasks";

import useADNCall from "../../useContract/useADNCall";
import useANDCallArray from "../../useContract/useADNCallArray";

export default function TasksWrapper({creator}) {
  const { data: totalUserTaskCount } = useADNCall("totalUserTaskCount", [
    creator,
  ]);
  const { data: taskIds } = useANDCallArray(
    "UserToTasks",
    creator,
    0,
    totalUserTaskCount?.toNumber() - 1
  );
  const taskIdsToNumber = taskIds.map(taskId=>taskId.toNumber());
  return <Tasks taskIds={taskIds} />;
}
