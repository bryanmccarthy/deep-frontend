import './Main.scss';
import Header from "./Header/Header";
import Journal from "./Journal/Journal";
import Dashboard from "./Dashboard/Dashboard";
import Pomodoro from "./Pomodoro/Pomodoro";
import Settings from "./Settings/Settings";
import { useState } from 'react';

function Main() {
  const [showPomodoro, setShowPomodoro] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [page, setPage] = useState('journal');

  return (
    <div className="Main">
      <Header setPage={setPage} setShowPomodoro={setShowPomodoro} setShowSettings={setShowSettings} />
      <div className="Page">
        { page === 'journal' ? <Journal /> : null }
        { page === 'dashboard' ? <Dashboard /> : null }
        <Pomodoro showPomodoro={showPomodoro} setShowPomodoro={setShowPomodoro} />
        <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
      </div>
    </div>
  )
}

export default Main;
