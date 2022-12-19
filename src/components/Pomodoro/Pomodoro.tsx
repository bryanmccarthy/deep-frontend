import './Pomodoro.scss'
import Timer from './Timer/Timer';
import Settings from './Settings/Settings';
import { useState } from 'react';

interface PomodoroProps {
  showPomodoro: boolean;
  setShowPomodoro: (show: boolean) => void;
}

function Pomodoro({ showPomodoro, setShowPomodoro }: PomodoroProps) {
  const [currentTimer, setCurrentTimer] = useState('work');
  const [workDuration, setWorkDuration] = useState(60 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);

  // TODO: Request workDuration and breakDuration from the user

  const handleClosePomodoro = () => {
    setShowPomodoro(false);
  }

  return (
    <div className="Pomodoro" style={{ visibility: showPomodoro ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleClosePomodoro}>&times;</button>
      <Timer workDuration={workDuration} breakDuration={breakDuration} currentTimer={currentTimer} />
      <Settings setCurrentTimer={setCurrentTimer} setWorkDuration={setWorkDuration} setBreakDuration={setBreakDuration} />
    </div>
  )
}

export default Pomodoro;
