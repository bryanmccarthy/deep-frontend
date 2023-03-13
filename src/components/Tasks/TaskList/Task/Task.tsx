import './Task.scss'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import dayjs from 'dayjs';
import { useState } from 'react';
import axios from 'axios';

type TaskProps = {
  task: any;
  handleDeleteTask: (task: any, e: React.MouseEvent) => void;
  handleExpandTask: (tasK: any) => void;
  handleToggleCompleted: (id: number, completed: boolean, e: React.MouseEvent) => void;
}

function Task({ task, handleDeleteTask, handleExpandTask, handleToggleCompleted } :TaskProps) {

  const [updatedTitle, setUpdatedTitle] = useState<string>('');

  async function handleUpdateTaskTitle() {
    const res = await axios.put(import.meta.env.VITE_URL + '/tasks/update/title', {
      id: task.id,
      title: updatedTitle,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      setUpdatedTitle('');
    }
  }

  // Handle setting input width based on title length
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUpdatedTitle(e.target.value);
    e.target.style.width = `${e.target.value.length * 8}px`;
  }

  function handleInputWidth() {
    return task.title.length * 8;
  }

  function handleTaskClick() {
    handleExpandTask(task);
  }


  return (
    <div className="Task" onClick={handleTaskClick}>
      <div className="TaskLeft">
        {
          task.completed ?
            <CheckBoxIcon 
              className="CheckBoxIcon" 
              onClick={(e) => handleToggleCompleted(task.id, task.completed, e)} 
            />
          : 
            <CheckBoxOutlineBlankIcon 
              className="CheckBoxIcon" 
              onClick={(e) => handleToggleCompleted(task.id, task.completed, e)} 
            />
        }
        <input 
          className="TaskTitle" 
          type="text"
          style={{ width: `${handleInputWidth()}px` }}
          defaultValue={task.title}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUpdateTaskTitle();
              e.currentTarget.blur(); // Unfocus input
            } else if (e.key === 'Escape') {
              e.currentTarget.blur(); // Unfocus input
            }
          }} 
        />
      </div>
      <div className="TaskRight">
        <div className="TaskDueDate">{dayjs(task.due_date).format('MM/DD/YYYY')}</div>
        <LaunchIcon className="LaunchIcon" onClick={() => handleExpandTask(task)} />
        <DeleteIcon className="DeleteIcon" onClick={(e) => handleDeleteTask(task, e)} />
      </div>
    </div>
  )
}

export default Task;
