import './NewTask.scss';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Slider from '@mui/material/Slider';

interface NewTaskProps {
  showNewTask: boolean;
  setShowNewTask: (show: boolean) => void;
  getTasks: () => void;
}

function NewTask({ showNewTask, setShowNewTask, getTasks }: NewTaskProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState(0);
  const [difficultyText, setDifficultyText] = useState('Easy');

  async function createTask() {
    await axios.post(import.meta.env.VITE_URL + '/tasks/create', {
      Title: title,
      Difficulty: difficulty,
    },
    {
      withCredentials: true,
    });
    setTitle('');
    setShowNewTask(false);
    setDifficulty(0);
    setDifficultyText('Easy');
    getTasks();
  }

  const handleSliderChange = (event: Event, value: number | number[]) => {
    setDifficulty(value as number);
    setDifficultyText(value === 0 ? 'Easy' : value === 1 ? 'Medium' : 'Hard');
  }

  function handleCloseNewTask() {
    setShowNewTask(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowNewTask(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  
  return (
    <div ref={ref} className="NewTask" style={{ visibility: showNewTask ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleCloseNewTask}>&times;</button>
      <div className="NewTaskForm">
        <input className="TitleInput" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="DifficultySetting">
          <p className="DifficultyLabel">{ difficultyText }</p>
          <Slider value={difficulty} sx={{color: 'navy'}} onChange={handleSliderChange} valueLabelDisplay="off" step={1} min={0} max={2} />
        </div>
        <button className="CreateTaskButton" onClick={createTask}>Create</button>
      </div>
    </div>
  )
}

export default NewTask;
