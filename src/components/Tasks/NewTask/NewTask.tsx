import './NewTask.scss';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';

interface NewTaskProps {
  showNewTask: boolean;
  setShowNewTask: (show: boolean) => void;
  getTasks: () => void;
}

function NewTask({ showNewTask, setShowNewTask, getTasks }: NewTaskProps) {
  const ref = useRef<HTMLInputElement>(null);
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
    setTitle('');
    setDifficulty(0);
    setShowNewTask(false);
    getTasks();
  }

  const handleSliderChange = (event: Event, value: number | number[]) => {
    setDifficulty(value as number);
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
        <input className="TitleInput" type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="DifficultySetting">

        </div>
        <AddBoxIcon className="CreateTaskButton" onClick={createTask} />
    </div>
  )
}

export default NewTask;
