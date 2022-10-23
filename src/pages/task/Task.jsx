import Task from "../../components/task/Task";
import { useParams } from 'react-router-dom';

const TaskPage = () => {
  let {id} = useParams();

  return (
    <Task taskId={id}/>
  );
};

export default TaskPage;
