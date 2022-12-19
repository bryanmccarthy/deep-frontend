import './Pomodoro.scss'
import Settings from './Settings/Settings';
import { useState } from 'react';

interface PomodoroProps {
  showPomodoro: boolean;
  setShowPomodoro: (show: boolean) => void;
}

function Pomodoro({ showPomodoro, setShowPomodoro }: PomodoroProps) {
  const [currentTimer, setCurrentTimer] = useState('work');
  const [seconds, setSeconds] = useState(0);
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const [formattedDuration, setFormattedDuration] = useState('25:00');
  const [isActive, setIsActive] = useState(false);

  console.log('currentTimer: ', currentTimer);
  console.log('seconds', seconds);
  console.log('workDuration', workDuration);
  console.log('breakDuration', breakDuration);
  console.log('isActive', isActive);

  // TODO: Request workDuration and breakDuration from the user

  const handleClosePomodoro = () => {
    setShowPomodoro(false);
  }

  const formatDuration = (time: number) => {

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    setFormattedDuration(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
  }

  return (
    <div className="Pomodoro" style={{ visibility: showPomodoro ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleClosePomodoro}>&times;</button>
      <div className="Timer">
        <h1 className="FormattedDuration">{ formattedDuration }</h1>
      </div>
      <Settings currentTimer={currentTimer} setCurrentTimer={setCurrentTimer} 
      setSeconds={setSeconds} workDuration={workDuration} 
      setWorkDuration={setWorkDuration} breakDuration={breakDuration} 
      setBreakDuration={setBreakDuration} setFormattedDuration={setFormattedDuration} isActive={isActive} setIsActive={setIsActive} />
    </div>
  )
}

export default Pomodoro;
