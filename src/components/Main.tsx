import './Main.scss';
import Header from "./Header/Header";
import Journal from "./Journal/Journal";
import Pomodoro from "./Pomodoro/Pomodoro";
import Dashboard from "./Dashboard/Dashboard";
import { useState } from 'react';

function Main() {

  const [page, setPage] = useState('journal');

  return (
    <div className="Main">
      <Header page={page} setPage={setPage} />
      <div className="Page">
        { page === 'journal' ? <Journal /> : null }
        { page === 'pomodoro' ? <Pomodoro /> : null }
        { page === 'dashboard' ? <Dashboard /> : null }
      </div>
    </div>
  );
}

export default Main;
