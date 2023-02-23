import './Main.scss';
import axios from "axios";
import Tasks from "./Tasks/Tasks";
import Dashboard from "./Dashboard/Dashboard";
import Pomodoro from "./Pomodoro/Pomodoro";
import { useState } from 'react';
import TimerIcon from '@mui/icons-material/Timer';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

function Main() {
  const [showPomodoro, setShowPomodoro] = useState<boolean>(false);
  const [page, setPage] = useState<string>('tasks');

  

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

  return (
    <div className="Main">
      <div className="Icons">
        {
          page === 'dashboard' ?
          <FormatListBulletedIcon className="Icon" onClick={ () => setPage('tasks') } /> :
          <DashboardIcon className="Icon" onClick={ () => setPage('dashboard') } />
        }
        <TimerIcon className="Icon" onClick={ handlePomodoro } />
        <LogoutIcon className="Icon" onClick={ handleLogout } />
      </div>
      <div className="Page">
        { page === 'tasks' ? <Tasks /> : null }
        { page === 'dashboard' ? <Dashboard /> : null }
        <Pomodoro showPomodoro={showPomodoro} setShowPomodoro={setShowPomodoro} />
      </div>
    </div>
  )
}

export default Main;
