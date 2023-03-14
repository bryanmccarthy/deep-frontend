import './TaskList.scss';
import Task from './Task/Task';

type TaskListProps = {
  tasks: any;
  setTasks: (tasks: any) => void;
  handleDeleteTask: (task: any, e: React.MouseEvent) => void;
  handleExpandTask: (task: any) => void;
  handleToggleCompleted: (id: number, completed: boolean, e: React.MouseEvent) => void;
}

function TaskList({ tasks, setTasks, handleDeleteTask, handleExpandTask, handleToggleCompleted }: TaskListProps) {

  return (
    <div className="TaskList">
      {
        tasks.map((task: any) => {
          return (
            <Task 
              key={task.id}
              tasks={tasks}
              setTasks={setTasks}
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

