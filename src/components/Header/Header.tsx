import './Header.scss'
import axios from "axios";
import { AiFillClockCircle } from 'react-icons/ai';
import { MdSettings } from 'react-icons/md';

interface HeaderProps {
  setPage: (page: string) => void;
  setShowPomodoro: (show: boolean) => void;
}

function Header({ setPage, setShowPomodoro }: HeaderProps) {

  function handleTasks() {
    setPage('tasks');
  }

  function handleDashboard() {
    setPage('dashboard');
  }

  function handlePomodoro() {
    setShowPomodoro(true);
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
      </div>
      <button className="NavButton" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Header;
