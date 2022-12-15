import './Header.scss'
import axios from "axios";

function Header({ page, setPage }: { page: string, setPage: Function}) {

  function handleJournal() {
    setPage('journal');
  }

  function handlePomodoro() {
    setPage('pomodoro');
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
