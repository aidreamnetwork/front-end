import React from "react";
import TaskReadOnly from "./TaskReadOnly";
import "./tasks.scss"

function Tasks({ taskIds }) {
  return (
    <>
      <div className="tasks">
        <div className="tasks-container">
          <div className="tasks-container-text">
            <h1>List tasks by creator</h1>
          </div>
          <div className="tasks-container-card">
            {taskIds?.map((taskId, index) => (
              <TaskReadOnly key={index} taskId={taskId} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tasks;
