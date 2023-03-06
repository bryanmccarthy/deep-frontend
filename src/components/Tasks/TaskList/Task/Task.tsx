import './Task.scss'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

type TaskProps = {
  task: any;
  handleExpandTask: () => void;
}

function Task({ task, handleExpandTask } :TaskProps) {

  return (
    <div className="Task">
      <div className="TaskLeft">
        {
          task.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />
        }
        <h3>{task.title}</h3>
      </div>
      <div className="TaskRight">
        <div>{task.difficulty}</div>
        <div>{dayjs(task.due_date).format('MM/DD/YYYY')}</div>
        <DeleteIcon />
        <div onClick={() => handleExpandTask(task)}>Expand</div>
      </div>
    </div>
  )
}

export default Task;
