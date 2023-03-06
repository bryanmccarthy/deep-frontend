import './TaskList.scss';
import Task from './Task/Task';

type TaskListProps = {
  tasks: any;
  handleExpandTask: () => void;
}

function TaskList({ tasks, handleExpandTask }: TaskListProps) {

  return (
    <div className="TaskList">
      {
        tasks.map((task: any) => {
          return <Task task={task} handleExpandTask={handleExpandTask} />
        })
      }
    </div>
  )
}

export default TaskList;

