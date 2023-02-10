import './Header.scss'
import axios from "axios";
import { AiFillClockCircle } from 'react-icons/ai';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';

interface HeaderProps {
  setPage: (page: string) => void;
  showPomodoro: boolean;
  setShowPomodoro: (show: boolean) => void;
  showNewTask: boolean;
  setShowNewTask: (show: boolean) => void;
}

function Header({ setPage, showPomodoro, setShowPomodoro, showNewTask, setShowNewTask }: HeaderProps) {

  function handleTasks() {
    setPage('tasks');
  }

  function handleDashboard() {
    setPage('dashboard');
  }

  function handlePomodoro() {
    if (showNewTask) setShowNewTask(false);
    setShowPomodoro(true);
  }

  function handleNewTask() {
    if (showPomodoro) setShowPomodoro(false);
    setShowNewTask(true);
  }

  async function handleLogout() {
    const res = await axios.get(import.meta.env.VITE_URL + '/auth/logout', {
      withCredentials: true,
      }
    )
  
    if (res && res.status === 200) {
      sessionStorage.removeItem('user');
      window.location.reload();
    }
  }

  return (
    <div className="Header">
      <div className="NavPages">
        <button className="NavButton" onClick={ handleTasks }>Tasks</button>
        <button className="NavButton" onClick={ handleDashboard }>Dashboard</button>
      </div>
      <div className="NavIcons">
        <AiFillClockCircle className="Icon" onClick={ handlePomodoro } />
        <AddIcon className="Icon" onClick={ handleNewTask } />
      </div>
      <button className="NavButton" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Header;
