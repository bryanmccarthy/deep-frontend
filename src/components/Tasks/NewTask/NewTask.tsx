import './NewTask.scss';
import axios from 'axios';
import { useState } from 'react';
import Slider from '@mui/material/Slider';

interface NewTaskProps {
  showNewTask: boolean;
  setShowNewTask: (show: boolean) => void;
}

function NewTask({ showNewTask, setShowNewTask }: NewTaskProps) {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState(0);

  async function createTask() {
    await axios.post(import.meta.env.VITE_URL + '/tasks/create', {
      Title: title,
      Difficulty: difficulty,
    },
    {
      withCredentials: true,
    });
  }

  const handleSliderChange = (event: Event, value: number | number[]) => {
    setDifficulty(value as number);
  }

  function handleCloseNewTask() {
    setShowNewTask(false);
  }
  
  return (
    <div className="NewTask" style={{ visibility: showNewTask ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleCloseNewTask}>&times;</button>
      <div className="NewTaskForm">
        <input className="TitleInput" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="DifficultySetting">
          <p className="DifficultyLabel">Difficulty: { difficulty }</p>
          <Slider value={difficulty} sx={{color: 'navy'}} onChange={handleSliderChange} valueLabelDisplay="off" step={1} min={0} max={10} />
        </div>
        <button className="CreateTaskButton" onClick={createTask}>Create</button>
      </div>
    </div>
  )
}

export default NewTask;
