import './Header.scss'
import Pomodoro from '../Pomodoro/Pomodoro';
import { useState } from 'react';
import axios from "axios";

interface HeaderProps {
  setShowPomodoro: (show: boolean) => void;
  page: string;
  setPage: (page: string) => void;
}

function Header({ setShowPomodoro, page, setPage }: HeaderProps) {

  function handleJournal() {
    setPage('journal');
  }

  function handleDashboard() {
    setPage('dashboard');
  }

  function handlePomodoro() {
    setShowPomodoro(true);
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
      <button className="NavButton" onClick={ handleDashboard }>dashboard</button>
      <button className="NavButton" onClick={ handlePomodoro }>Pomodoro</button>
      <button className="LogoutButton" onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Header;
