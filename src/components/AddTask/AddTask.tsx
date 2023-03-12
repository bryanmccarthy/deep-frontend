import './AddTask.scss';
import axios from 'axios';
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InfoIcon from '@mui/icons-material/Info';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Dayjs } from 'dayjs';

type PomodoroProps = {
  tasks: any;
  setTasks: (tasks: any) => void;
  showAddTask: boolean;
  setShowAddTask: (show: boolean) => void;
  errorSnackbarOpen: boolean;
  setErrorSnackbarOpen: (open: boolean) => void;
  page: string;
}

function AddTask({ tasks, setTasks, showAddTask, setShowAddTask, errorSnackbarOpen, setErrorSnackbarOpen, page }: PomodoroProps) {
  const [title, setTitle] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>(0);
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  async function handleCreateTask() {
    if (title === '') return;
    if (dueDate === null) return;

    const res = await axios.post(import.meta.env.VITE_URL + '/tasks/create', {
      title: title,
      difficulty: difficulty,
      due_date: dueDate,
      completed: false,
      progress: 0,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      const newTasks = [...tasks, {
        id: res.data.id,
        title: res.data.title,
        difficulty: res.data.difficulty,
        due_date: res.data.due_date,
        completed: res.data.completed,
      }].sort((a: any, b: any) => { return new Date(a.due_date).getTime() - new Date(b.due_date).getTime(); });
      setTasks(newTasks);

      // Clear inputs
      setTitle('');
      setDifficulty(0);
      setDueDate(null);
      setShowAddTask(false);
      } else {
      setErrorSnackbarOpen(true);
    }
  }

  function handleMouseOver() {
    setShowInfo(true);
  }

  function handleMouseOut() {
    setShowInfo(false);
  }

  function handleClosePomodoro() {
    setShowAddTask(false);
  }

  function handleDifficultyChange(event: any) {
    setDifficulty(event.target.value);
  }

  return (
    <div className="AddTask" style={{ visibility: showAddTask ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleClosePomodoro}>&times;</button>
      
      <div className="AddTaskInputs">
          <TextField className="TitleInput" label="Title" size="small" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="DifficultyContainer">
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
            <InfoIcon className="DifficultyInfoIcon" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
            { showInfo && 
              <div className="DifficultyInfo">
                <ArrowDropUpIcon className="DifficultyInfoArrow" />
                <div className="DifficultyInfoText">
                  {/* TODO: diff grid 1-6 (1 = 20-30 mins) (2 = 30-60) (3 = 60-120) (4 = 120-240) (5 = 240 - 360) (6 = 360 - 480) */}
                  <p>12</p>
                  <p>34</p>
                  <p>56</p>
                </div>
              </div> 
            }
            </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              className="DueDatePicker"
              inputFormat="MM/DD/YYYY"
              value={dueDate}
              onChange={(date) => setDueDate(date)}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </LocalizationProvider>
          <button className="AddTaskButton" onClick={handleCreateTask}>Create</button>
        </div>
    </div>
  )
}

export default AddTask;