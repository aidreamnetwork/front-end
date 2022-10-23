import React from "react";

import useADNCall from "../../useContract/useADNCall";
import useANDCallArray from "../../useContract/useADNCallArray";
import BidReadOnly from "../bids/BidReadOnly";
import TaskReadOnly from "../tasks/TaskReadOnly";

export default function ListTask({ number }) {
  const { data: total  } = useADNCall("taskCount");
  var taskIds = [];
  let to = total?.toNumber();
  let from = to - number;
  for (var i = to; i > from; i--) {
    taskIds.push(i);
  }
  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-card">
          {taskIds?.map((taskId, index) => (
            <TaskReadOnly key={index} taskId={taskId} />
          ))}
        </div>
      </div>
    </div>
  );
}
