import './Task.scss'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import dayjs from 'dayjs';

type TaskProps = {
  task: any;
  handleDeleteTask: (task: any) => void;
  handleExpandTask: (tasK: any) => void;
  handleToggleCompleted: (id: number, completed: boolean) => void;
}

function Task({ task, handleDeleteTask, handleExpandTask, handleToggleCompleted } :TaskProps) {

  return (
    <div className="Task">
      <div className="TaskLeft">
        {
          task.completed ?
            <CheckBoxIcon className="CheckBoxIcon" onClick={() => handleToggleCompleted(task.id, task.completed)} />
          : 
            <CheckBoxOutlineBlankIcon className="CheckBoxIcon" onClick={() => handleToggleCompleted(task.id, task.completed)} />
        }
        <p className="TaskTitle">{task.title}</p>
        {/* TODO: possibly add time spent */}
      </div>
      <div className="TaskRight">
        <div className="TaskDueDate">{dayjs(task.due_date).format('MM/DD/YYYY')}</div>
        <LaunchIcon className="LaunchIcon" onClick={() => handleExpandTask(task)} />
        <DeleteIcon className="DeleteIcon" onClick={() => handleDeleteTask(task)} />
      </div>
    </div>
  )
}

export default Task;
