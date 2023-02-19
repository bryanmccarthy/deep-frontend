import './Header.scss'
import axios from "axios";
import TimerIcon from '@mui/icons-material/Timer';

interface HeaderProps {
  setPage: (page: string) => void;
}

function Header({ setPage }: HeaderProps) {

  function handleTasks() {
    setPage('tasks');
  }

  function handleDashboard() {
    setPage('dashboard');
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
    <div className="Header">
      <div className="NavPages">
        <button className="NavButton" onClick={ handleTasks }>Tasks</button>
        <button className="NavButton" onClick={ handleDashboard }>Dashboard</button>
      </div>
      <button className="NavButton" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Header;
