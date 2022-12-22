import './Main.scss';
import Header from "./Header/Header";
import Journal from "./Journal/Journal";
import Dashboard from "./Dashboard/Dashboard";
import Pomodoro from "./Pomodoro/Pomodoro";
import Settings from "./Settings/Settings";
import { useState } from 'react';
import { theme } from '../helpers/theme';

type Style = {
  color: string;
  backgroundColor: string;
}

function Main() {
  const [showPomodoro, setShowPomodoro] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [page, setPage] = useState<string>('journal');
  const [mode, setMode] = useState<string | null>(localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light');

  const themeIdx = mode === 'dark' ? 'dark' : 'light';
  const style: Style = {
    color: theme[themeIdx].color,
    backgroundColor: theme[themeIdx].backgroundColor,
  }

  return (
    <div className="Main">
      <Header setPage={setPage} setShowPomodoro={setShowPomodoro} setShowSettings={setShowSettings} />
      <div className="Page">
        { page === 'journal' ? <Journal style={style} /> : null }
        { page === 'dashboard' ? <Dashboard style={style}/> : null }
        <Pomodoro showPomodoro={showPomodoro} setShowPomodoro={setShowPomodoro} />
        <Settings showSettings={showSettings} setShowSettings={setShowSettings} mode={mode} setMode={setMode} />
      </div>
    </div>
  )
}

export default Main;
