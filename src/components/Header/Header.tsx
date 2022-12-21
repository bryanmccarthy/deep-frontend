import './Header.scss'
import axios from "axios";
import { AiFillClockCircle } from 'react-icons/ai';

interface HeaderProps {
  setShowPomodoro: (show: boolean) => void;
  page: string;
  setPage: (page: string) => void;
}

function Header({ setShowPomodoro, page, setPage }: HeaderProps) {

  function handleJournal() {
    setPage('journal');
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
      <div className="Navigation">
        <button className="NavButton" onClick={ handleJournal }>Journal</button>
        <button className="NavButton" onClick={ handleDashboard }>Dashboard</button>
      </div>
      <AiFillClockCircle className="PomodoroIcon" onClick={ handlePomodoro }/> {/* TODO: change icon */}
      <button className="NavButton" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Header;
