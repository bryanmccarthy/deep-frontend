import './TaskList.scss';
import Task from './Task/Task';

type TaskListProps = {
  tasks: any;
  handleDeleteTask: (task: any) => void;
  handleExpandTask: (task: any) => void;
  handleToggleCompleted: (id: number, completed: boolean) => void;
}

function TaskList({ tasks, handleDeleteTask, handleExpandTask, handleToggleCompleted }: TaskListProps) {

  return (
    <div className="TaskList">
      {
        tasks.map((task: any) => {
          return (
            <Task 
              key={task.id}
              task={task} 
              handleDeleteTask={handleDeleteTask} 
              handleExpandTask={handleExpandTask} 
              handleToggleCompleted={handleToggleCompleted}
            />
          )
        })
      }
    </div>
  )
}

export default TaskList;
