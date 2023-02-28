import './Main.scss';
import axios from "axios";
import Tasks from "./Tasks/Tasks";
import Dashboard from "./Dashboard/Dashboard";
import Pomodoro from "./Pomodoro/Pomodoro";
import ExpandedTask from "./ExpandedTask/ExpandedTask";
import { useState } from 'react';
import TimerIcon from '@mui/icons-material/Timer';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

function Main() {
  const [showPomodoro, setShowPomodoro] = useState<boolean>(false);
  const [page, setPage] = useState<string>('tasks');

  // Expanded Task State Variables
  const [expandedTaskID, setExpandedTaskID] = useState<number>(0);
  const [expandedTaskTitle, setExpandedTaskTitle] = useState<string>('');
  const [expandedTaskDifficulty, setExpandedTaskDifficulty] = useState<number>(0);
  const [expandedTaskCompleted, setExpandedTaskCompleted] = useState<boolean>(false);
  const [expandedTaskNotes, setExpandedTaskNotes] = useState<[]>([]);

  function handlePomodoro() {
    setShowPomodoro(true);
  }

  function handleCloseExpandedTask() {
    setPage('tasks');
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

  return (
    <div className="Main">
      <div className="Icons">
        <div>
          {
            page === 'dashboard' ?
            <FormatListBulletedIcon className="Icon" onClick={ () => setPage('tasks') } /> :
            <DashboardIcon className="Icon" onClick={ () => setPage('dashboard') } />
          }
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
            setExpandedTaskID={setExpandedTaskID}
            setExpandedTaskTitle={setExpandedTaskTitle}
            setExpandedTaskDifficulty={setExpandedTaskDifficulty}
            setExpandedTaskCompleted={setExpandedTaskCompleted}
            setExpandedTaskNotes={setExpandedTaskNotes}
         />
          : 
          null 
        }
        { page === 'dashboard' ? <Dashboard /> : null }
        { 
          page === 'expandedTask' ? 
          <ExpandedTask 
            handleCloseExpandedTask={handleCloseExpandedTask} 
            expandedTaskID={expandedTaskID}
            expandedTaskTitle={expandedTaskTitle}  
            expandedTaskDifficulty={expandedTaskDifficulty} 
            expandedTaskCompleted={expandedTaskCompleted} 
            setExpandedTaskCompleted={setExpandedTaskCompleted} 
            expandedTaskNotes={expandedTaskNotes} 
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
