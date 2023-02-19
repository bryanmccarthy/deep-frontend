import './Main.scss';
import Sidebar from "./Sidebar/Sidebar";
import Tasks from "./Tasks/Tasks";
import Dashboard from "./Dashboard/Dashboard";
import Pomodoro from "./Pomodoro/Pomodoro";
import { useState } from 'react';
import TimerIcon from '@mui/icons-material/Timer';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function Main() {
  const [showPomodoro, setShowPomodoro] = useState<boolean>(false);
  const [page, setPage] = useState<string>('tasks');
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(false);

  function handleShowSiderbar() {
    setSidebarHidden(false);
  }

  function handlePomodoro() {
    setShowPomodoro(true);
  }

  return (
    <div className="Main">
      { sidebarHidden === true ? <button className="OpenSidebarButton" onClick={handleShowSiderbar}><ArrowRightIcon /></button> : <Sidebar setPage={setPage} setSidebarHidden={setSidebarHidden} /> }
      <div className="Page">
        { page === 'tasks' ? <Tasks /> : null }
        { page === 'dashboard' ? <Dashboard /> : null }
        <Pomodoro showPomodoro={showPomodoro} setShowPomodoro={setShowPomodoro} />
      </div>
      <TimerIcon className="Icon" onClick={ handlePomodoro } />
    </div>
  )
}

export default Main;
