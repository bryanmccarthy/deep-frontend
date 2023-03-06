import './NewTask.scss';
import axios from 'axios';
import { useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

type NewTaskProps = {
  tasks: any;
  setTasks: (tasks: any) => void;
}

function NewTask({ tasks, setTasks }: NewTaskProps) {
  const [title, setTitle] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>(0);
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);

  async function createTask() {
    if (title === '') return;
    if (dueDate === null) return;

    const res = await axios.post(import.meta.env.VITE_URL + '/tasks/create', {
      title: title,
      difficulty: difficulty,
      due_date: dueDate,
    },
    {
      withCredentials: true,
    });

    // Clear inputs
    setTitle('');
    setDifficulty(0);
    setDueDate(null);

    if (res.status === 200) {
      setTasks([...tasks, {
        id: res.data.id,
        title: res.data.title,
        difficulty: res.data.difficulty,
        due_date: res.data.due_date,
        completed: res.data.completed,
      }].sort((a: TaskType, b: TaskType) => {
        return dayjs(a.due_date) - dayjs(b.due_date);
        })
      );      
      } else {
      setErrorSnackbarOpen(true);
    }
  }

  function handleDifficultyChange(event: any) {
    setDifficulty(event.target.value);
  }
  
  return (
    <div className="NewTask">
        <TextField className="TitleInput" label="Title" size="small" value={title} onChange={(e) => setTitle(e.target.value)} />
        <FormControl className="DifficultyForm">
          <InputLabel>Difficulty</InputLabel>
          <Select
          className="DifficultySelect"
          value={difficulty}
          label="Difficulty"
          size="small"
          onChange={(e) => handleDifficultyChange(e)}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            className="DueDatePicker"
            inputFormat="MM/DD/YYYY"
            size="small"
            value={dueDate}
            onChange={(date) => setDueDate(date)}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </LocalizationProvider>
        <NoteAddIcon className="NoteAddIcon" onClick={createTask}/>
    </div>
  )
}

export default NewTask;
