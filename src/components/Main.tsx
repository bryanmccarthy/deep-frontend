import './Main.scss';
import Header from "./Header/Header";
import Tasks from "./Tasks/Tasks";
import Dashboard from "./Dashboard/Dashboard";
import Pomodoro from "./Pomodoro/Pomodoro";
import NewTask from "./NewTask/NewTask";
import { useState } from 'react';

function Main() {
  const [showPomodoro, setShowPomodoro] = useState<boolean>(false);
  const [showNewTask, setShowNewTask] = useState<boolean>(false);
  const [page, setPage] = useState<string>('tasks');

  return (
    <div className="Main">
      <Header setPage={setPage} showPomodoro={showPomodoro} setShowPomodoro={setShowPomodoro}
      showNewTask={showNewTask} setShowNewTask={setShowNewTask} />
      <div className="Page">
        { page === 'tasks' ? <Tasks /> : null }
        { page === 'dashboard' ? <Dashboard /> : null }
        <Pomodoro showPomodoro={showPomodoro} setShowPomodoro={setShowPomodoro} />
        <NewTask showNewTask={showNewTask} setShowNewTask={setShowNewTask} />
      </div>
    </div>
  )
}

export default Main;
