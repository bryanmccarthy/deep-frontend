import './NewTask.scss';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

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
      title: title,
      difficulty: difficulty,
    },
    {
      withCredentials: true,
    });
    setTitle('');
    setDifficulty(0);
    setShowNewTask(false);
    getTasks();
  }

  function handleDifficultyChange(event: any) {
    setDifficulty(event.target.value);
  }
  
  return (
    <div className="NewTask">
        <TextField className="TitleInput" label="Title" variant="standard" value={title} onChange={(e) => setTitle(e.target.value)} />
        <FormControl className="DifficultyForm" variant="standard" size="small">
          <InputLabel>Difficulty</InputLabel>
          <Select
          className="DifficultySelect"
          value={difficulty}
          label="Difficulty"
          onChange={(e) => handleDifficultyChange(e)}
          >
            <MenuItem value={0}><FiberManualRecordIcon fontSize="small" /></MenuItem>
            <MenuItem value={1}><FiberManualRecordIcon fontSize="small" /><FiberManualRecordIcon fontSize="small" /></MenuItem>
            <MenuItem value={2}><FiberManualRecordIcon fontSize="small" /><FiberManualRecordIcon fontSize="small" /><FiberManualRecordIcon fontSize="small" /></MenuItem>
          </Select>
        </FormControl>
        <NoteAddIcon className="NoteAddIcon" onClick={createTask}/>
    </div>
  )
}

export default NewTask;
