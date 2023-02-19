import './Sidebar.scss'
import axios from "axios";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

interface SidebarProps {
  setPage: (page: string) => void;
  setSidebarHidden: (sidebarHidden: boolean) => void;
}

function Sidebar({ setPage, setSidebarHidden }: SidebarProps) {

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
          <div className="NavSection">
            <FormatListBulletedIcon className="NavIcon" onClick={ handleTasks } />
            <button className="NavButton" onClick={ handleTasks }>Tasks</button>
          </div>
          <div className="NavSection">
            <DashboardIcon className="NavIcon" onClick={ handleDashboard } />
            <button className="NavButton" onClick={ handleDashboard }>Dashboard</button>
          </div>
          <div className="NavSection">
            <LogoutIcon className="NavIcon" onClick={handleLogout} />
            <button className="NavButton" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <button className="CloseSidebarButton" onClick={() => setSidebarHidden(true)}><ArrowLeftIcon fontSize="large" /></button>
    </div>
  );
}

export default Sidebar;
