import './Header.scss'
import Pomodoro from '../Pomodoro/Pomodoro';
import { useState } from 'react';
import axios from "axios";
import { MdDashboard } from 'react-icons/md';
import { AiFillClockCircle } from 'react-icons/ai';

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
      <button className="NavButton" onClick={ handleJournal }>Journal</button>
      <button className="NavButton" onClick={ handleDashboard }><MdDashboard /></button>
      <button className="NavButton" onClick={ handlePomodoro }><AiFillClockCircle /></button> {/* TODO: add clock icon */}
      <button className="LogoutButton" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Header;
