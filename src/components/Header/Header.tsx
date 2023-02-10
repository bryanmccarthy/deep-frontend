import './Header.scss'
import axios from "axios";
import { AiFillClockCircle } from 'react-icons/ai';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';

interface HeaderProps {
  setPage: (page: string) => void;
  setShowPomodoro: (show: boolean) => void;
  setShowNewTask: (show: boolean) => void;
}

function Header({ setPage, setShowPomodoro, setShowNewTask }: HeaderProps) {

  function handleTasks() {
    setPage('tasks');
  }

  function handleDashboard() {
    setPage('dashboard');
  }

  function handlePomodoro() {
    setShowPomodoro(true);
  }

  function handleNewTask() {
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
