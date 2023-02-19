import './Sidebar.scss'
import axios from "axios";

interface SidebarProps {
  setPage: (page: string) => void;
}

function Sidebar({ setPage }: SidebarProps) {

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
    <div className="Sidebar">
      <div className="NavPages">
        <button className="NavButton" onClick={ handleTasks }>Tasks</button>
        <button className="NavButton" onClick={ handleDashboard }>Dashboard</button>
      </div>
      <button className="NavButton" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;
