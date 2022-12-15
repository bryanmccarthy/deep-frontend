import './Header.scss'
import axios from "axios";

function Header() {

  function handleJournal() {
    // handle journal
  }
  
  function handlePomodoro() {
    // handle pomodoro
  }

  function handleDashboard() {
    // handle dashboard
  }

  async function handleLogout() {
    const res = await axios.get('http://localhost:3000/auth/logout', {
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
      <button className="NavButton" onClick={ handleJournal }>journal</button>
      <button className="NavButton" onClick={ handlePomodoro }>pomodoro</button>
      <button className="NavButton" onClick={ handleDashboard }>dashboard</button>
      <button className="LogoutButton" onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Header;
