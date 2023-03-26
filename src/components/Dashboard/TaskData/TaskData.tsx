import "./TaskData.scss";

type TaskDataProps = {
  tasks: any;
}

function TaskData({ tasks }: TaskDataProps) {

  console.log(tasks);
  
  return (
    <div className="TaskData">
      <div className="TasksCompleted">
        {
          tasks.filter((task: any) => task.completed).length + ' / ' + tasks.length
        }
      </div>
      <div className="tasksCompletedLabel">
        Tasks Completed
        </div>
    </div>
  )

}

export default TaskData;