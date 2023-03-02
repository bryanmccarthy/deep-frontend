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

function Main() {
  const [showPomodoro, setShowPomodoro] = useState<boolean>(false);
  const [page, setPage] = useState<string>('tasks');

  const [tasks, setTasks] = useState<[]>([]);

  // Expanded Task State Variables
  const [expandedTaskID, setExpandedTaskID] = useState<number>(0);
  const [expandedTaskTitle, setExpandedTaskTitle] = useState<string>('');
  const [expandedTaskDifficulty, setExpandedTaskDifficulty] = useState<number>(0);
  const [expandedTaskDueDate, setExpandedTaskDueDate] = useState<string>('');
  const [expandedTaskCompleted, setExpandedTaskCompleted] = useState<boolean>(false);

  function handlePomodoro() {
    setShowPomodoro(true);
  }

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

  async function getTasks() {
    const res = await axios.get(import.meta.env.VITE_URL + '/tasks', 
    {
      withCredentials: true,
    });
    setTasks(res.data);
  }

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
          <DashboardIcon className="Icon" onClick={() => setPage('dashboard') } />
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
        <Pomodoro showPomodoro={showPomodoro} setShowPomodoro={setShowPomodoro} />
      </div>
    </div>
  )
}

export default Main;
