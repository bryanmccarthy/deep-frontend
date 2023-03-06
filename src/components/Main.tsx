import './Main.scss';
import axios from "axios";
import Tasks from "./Tasks/Tasks";
import Dashboard from "./Dashboard/Dashboard";
import Calendar from './Calendar/Calendar';
import Pomodoro from "./Pomodoro/Pomodoro";
import ExpandedTask from "./ExpandedTask/ExpandedTask";
import { useState } from 'react';
import { useQuery } from 'react-query';
import TimerIcon from '@mui/icons-material/Timer';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Main() {
  const [showPomodoro, setShowPomodoro] = useState<boolean>(false);
  const [page, setPage] = useState<string>('tasks');
  const [tasks, setTasks] = useState<[]>([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);

  // Expanded Task State Variables
  const [expandedTaskID, setExpandedTaskID] = useState<number>(0);
  const [expandedTaskTitle, setExpandedTaskTitle] = useState<string>('');
  const [expandedTaskDifficulty, setExpandedTaskDifficulty] = useState<number>(0);
  const [expandedTaskDueDate, setExpandedTaskDueDate] = useState<string>('');
  const [expandedTaskCompleted, setExpandedTaskCompleted] = useState<boolean>(false);

  async function handleLogout() {
    const res = await axios.get(import.meta.env.VITE_URL + '/auth/logout', {
      withCredentials: true,
      }
    )
  
    if (res && res.status === 200) {
      sessionStorage.removeItem('userFirstName');
      sessionStorage.removeItem('userLastName');
      window.location.reload();
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

  function handlePomodoro() {
    setShowPomodoro(true);
  }

  /*
    TODO: settings Icon w/ dropdown like pomodoro ??
    - display done tasks or not
    - dark mode
    - notifications
    - 
  */

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
          <FormatListBulletedIcon className="Icon" onClick={handleTaskPageClick} />
          <CalendarMonthIcon className="Icon" onClick={handleCalendarPageClick} />
          <DashboardIcon className="Icon" onClick={handleDashboardPageClick} />
        </div>
        <div>
          <TimerIcon className="Icon" onClick={ handlePomodoro } />
          <LogoutIcon className="Icon" onClick={ handleLogout } />
        </div>
      </div>
      <div className="Page">
        { 
          page === 'tasks' ?
         <Tasks
            setPage={setPage}
            tasks={tasks}
            setTasks={setTasks}
            getTasks={getTasks}
            setExpandedTaskID={setExpandedTaskID}
            setExpandedTaskTitle={setExpandedTaskTitle}
            setExpandedTaskDifficulty={setExpandedTaskDifficulty}
            setExpandedTaskDueDate={setExpandedTaskDueDate}
            setExpandedTaskCompleted={setExpandedTaskCompleted}
         />
          : 
          null 
        }
        { 
          page === 'dashboard' ? 
          <Dashboard /> 
          : 
          null 
        }
        {
          page === 'calendar' ?
          <Calendar
            setPage={setPage}
            tasks={tasks}
            setTasks={setTasks}
            getTasks={getTasks}
            setExpandedTaskID={setExpandedTaskID}
            setExpandedTaskTitle={setExpandedTaskTitle}
            setExpandedTaskDifficulty={setExpandedTaskDifficulty}
            setExpandedTaskDueDate={setExpandedTaskDueDate}
            setExpandedTaskCompleted={setExpandedTaskCompleted}
          />
          :
          null
        }
        { 
          page === 'expandedTask' ? 
          <ExpandedTask
            expandedTaskID={expandedTaskID}
            expandedTaskTitle={expandedTaskTitle}
            expandedTaskDifficulty={expandedTaskDifficulty}
            expandedTaskDueDate={expandedTaskDueDate}
            expandedTaskCompleted={expandedTaskCompleted}
            setExpandedTaskCompleted={setExpandedTaskCompleted}
          /> 
          :
          null 
        }

        <Pomodoro
          showPomodoro={showPomodoro} 
          setShowPomodoro={setShowPomodoro} 
          errorSnackbarOpen={errorSnackbarOpen} 
          setErrorSnackbarOpen={setErrorSnackbarOpen}
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
