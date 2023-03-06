import './TaskList.scss';
import Task from './Task/Task';

type TaskListProps = {
  tasks: any;
}

function TaskList({ tasks }: TaskListProps) {

  return (
    <div className="TaskList">
      {
        tasks.map((task: any) => {
          return <Task task={task} key={task.id} />
        })
      }
    </div>
  )
}

export default TaskList;

