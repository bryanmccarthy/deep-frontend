import './Main.scss';
import axios from "axios";
import Tasks from "./Tasks/Tasks";
import Dashboard from "./Dashboard/Dashboard";
import Calendar from './Calendar/Calendar';
import AddTask from "./AddTask/AddTask";
import Pomodoro from "./Pomodoro/Pomodoro";
import ExpandedTask from "./ExpandedTask/ExpandedTask";
import { useState } from 'react';
import { useQuery } from 'react-query';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import TimerIcon from '@mui/icons-material/Timer';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Dayjs } from 'dayjs';

const accent = '#000000';
const accent2 = '#ccced1';

function Main() {
  const [showPomodoro, setShowPomodoro] = useState<boolean>(false);
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [page, setPage] = useState<string>('tasks');
  const [tasks, setTasks] = useState<[]>([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);

  // Expanded Task State Variables
  const [expandedTaskID, setExpandedTaskID] = useState<number>(0);
  const [expandedTaskTitle, setExpandedTaskTitle] = useState<string>('');
  const [expandedTaskDifficulty, setExpandedTaskDifficulty] = useState<number>(0);
  const [expandedTaskDueDate, setExpandedTaskDueDate] = useState<string>('');
  const [expandedTaskCompleted, setExpandedTaskCompleted] = useState<boolean>(false);
  const [expandedTaskProgress, setExpandedTaskProgress] = useState<number>(0);
  const [expandedTaskTimeSpent, setExpandedTaskTimeSpent] = useState<number>(0);

  async function handleGetDashboardData() {
    // TODO: get data
    // Get total hours spent (maybe store milestone on server)
  }

  async function handleLogout() {
    const res = await axios.get(import.meta.env.VITE_URL + '/auth/logout', {
      withCredentials: true,
      }
    )
  
    if (res.status === 200) {
      sessionStorage.removeItem('userFirstName');
      sessionStorage.removeItem('userLastName');
      window.location.reload();
    } else {
      setErrorSnackbarOpen(true);
    }
  }

  function handleTaskPageClick() {
    getTasks();
    setPage('tasks');
  }

  function handleCalendarPageClick() {
    getTasks();
    setPage('calendar');
  }

  function handleDashboardPageClick() {
    setPage('dashboard');
  }

  function handleShowAddTask() {
    if (showPomodoro) setShowPomodoro(false);
    setShowAddTask(true);
  }

  function handleShowPomodoro() {
    if (showAddTask) setShowAddTask(false);
    setShowPomodoro(true);
  }

  async function getTasks() {
    const res = await axios.get(import.meta.env.VITE_URL + '/tasks', 
    {
      withCredentials: true,
    });
    
    if (res.status === 200) {
      res.data.sort((a: any, b: any) => { // Sort tasks by due date
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      });
      setTasks(res.data);
    } else {
      setErrorSnackbarOpen(true);
    }
  }

  function handleSnackbarClose() {
    setErrorSnackbarOpen(false);
  };

  // Fetch tasks on page load
  const { status } = useQuery('tasks', getTasks);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <div className="Main">
      <div className="Icons">
        <div>
          <FormatListBulletedIcon className="Icon" onClick={handleTaskPageClick} style={{ color: page === 'tasks' ? accent2 : accent }} />
          <CalendarMonthIcon className="Icon" onClick={handleCalendarPageClick} style={{ color: page === 'calendar' ? accent2 : accent }} />
          <DashboardIcon className="Icon" onClick={handleDashboardPageClick} style={{ color: page === 'dashboard' ? accent2 : accent }} />
        </div>
        <div>
          <PlaylistAddIcon className="Icon" onClick={handleShowAddTask} style={{ color: showAddTask ? accent2 : accent, visibility: page === 'expandedTask' || page === 'dashboard' ? 'hidden' : 'visible' }} />
          <TimerIcon className="Icon" onClick={handleShowPomodoro} style={{ color: showPomodoro ? accent2 : accent }} />
          <LogoutIcon className="Icon" onClick={handleLogout} />
        </div>
      </div>
      <div className="Page">
        { 
          page === 'tasks' &&
         <Tasks
            setPage={setPage}
            tasks={tasks}
            setTasks={setTasks}
            setExpandedTaskID={setExpandedTaskID}
            setExpandedTaskTitle={setExpandedTaskTitle}
            setExpandedTaskDifficulty={setExpandedTaskDifficulty}
            setExpandedTaskDueDate={setExpandedTaskDueDate}
            setExpandedTaskCompleted={setExpandedTaskCompleted}
            setExpandedTaskProgress={setExpandedTaskProgress}
            setExpandedTaskTimeSpent={setExpandedTaskTimeSpent}
         />
        }
        { 
          page === 'dashboard' &&
          <Dashboard tasks={tasks} /> 
        }
        {
          page === 'calendar' &&
          <Calendar
            setPage={setPage}
            tasks={tasks}
            setShowAddTask={setShowAddTask}
            setDueDate={setDueDate}
            setExpandedTaskID={setExpandedTaskID}
            setExpandedTaskTitle={setExpandedTaskTitle}
            setExpandedTaskDifficulty={setExpandedTaskDifficulty}
            setExpandedTaskDueDate={setExpandedTaskDueDate}
            setExpandedTaskCompleted={setExpandedTaskCompleted}
            setExpandedTaskProgress={setExpandedTaskProgress}
            setExpandedTaskTimeSpent={setExpandedTaskTimeSpent}
          />
        }
        { 
          page === 'expandedTask' &&
          <ExpandedTask
            expandedTaskID={expandedTaskID}
            expandedTaskTitle={expandedTaskTitle}
            expandedTaskDifficulty={expandedTaskDifficulty}
            expandedTaskDueDate={expandedTaskDueDate}
            expandedTaskCompleted={expandedTaskCompleted}
            setExpandedTaskCompleted={setExpandedTaskCompleted}
            expandedTaskProgress={expandedTaskProgress}
            setExpandedTaskProgress={setExpandedTaskProgress}
            expandedTaskTimeSpent={expandedTaskTimeSpent}
            setExpandedTaskTimeSpent={setExpandedTaskTimeSpent}
          /> 
        }

        <AddTask
          tasks={tasks}
          setTasks={setTasks}
          showAddTask={showAddTask}
          setShowAddTask={setShowAddTask}
          errorSnackbarOpen={errorSnackbarOpen}
          setErrorSnackbarOpen={setErrorSnackbarOpen}
          page={page}
          dueDate={dueDate}
          setDueDate={setDueDate}
        />

        <Pomodoro
          showPomodoro={showPomodoro} 
          setShowPomodoro={setShowPomodoro} 
          setErrorSnackbarOpen={setErrorSnackbarOpen}
          page={page}
          expandedTaskID={expandedTaskID}
          setExpandedTaskTimeSpent={setExpandedTaskTimeSpent}
        />
      </div>

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="oops, something went wrong!"
        action={
          <div>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        }
      />
    </div>
  )
}

export default Main;
