import './Main.scss';
import Header from "./Header/Header";
import Journal from "./Journal/Journal";
import Pomodoro from "./Pomodoro/Pomodoro";
import Dashboard from "./Dashboard/Dashboard";
import { useState } from 'react';

function Main() {
  const [showPomodoro, setShowPomodoro] = useState<boolean>(false);
  const [page, setPage] = useState('journal');

  return (
    <div className="Main">
      <Header setShowPomodoro={setShowPomodoro} page={page} setPage={setPage} />
      <div className="Page">
        { page === 'journal' ? <Journal /> : null }
        { page === 'dashboard' ? <Dashboard /> : null }
        <Pomodoro showPomodoro={showPomodoro} setShowPomodoro={setShowPomodoro} />
      </div>
    </div>
  )
}

export default Main;
