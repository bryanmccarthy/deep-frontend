import './Task.scss'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import dayjs from 'dayjs';

type TaskProps = {
  task: any;
  handleDeleteTask: () => void;
  handleExpandTask: () => void;
  handleToggleCompleted: () => void;
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
        <p>{task.title}</p>
        {/* TODO: possibly add time spent */}
      </div>
      <div className="TaskRight">
        <div>{task.difficulty}</div> {/* TODO: use ICONS */}
        <div>{dayjs(task.due_date).format('MM/DD/YYYY')}</div>
        <DeleteIcon className="DeleteIcon" onClick={() => handleDeleteTask(task)} />
        <LaunchIcon className="LaunchIcon" onClick={() => handleExpandTask(task)} />
      </div>
    </div>
  )
}

export default Task;
