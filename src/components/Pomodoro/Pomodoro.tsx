import './Pomodoro.scss'
import Settings from './Settings/Settings';
import { formatDuration } from './Settings/Settings';
import { useEffect, useState } from 'react';

interface PomodoroProps {
  showPomodoro: boolean;
  setShowPomodoro: (show: boolean) => void;
}

function Pomodoro({ showPomodoro, setShowPomodoro }: PomodoroProps) {
  const [currentTimer, setCurrentTimer] = useState('work');
  const [seconds, setSeconds] = useState(25 * 60);
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const [formattedDuration, setFormattedDuration] = useState('25:00');
  const [isActive, setIsActive] = useState(false);

  // TODO: Remove console.logs
  console.log('currentTimer: ', currentTimer);
  console.log('seconds', seconds);
  console.log('workDuration', workDuration);
  console.log('breakDuration', breakDuration);
  console.log('isActive', isActive);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds >= 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
        setFormattedDuration(formatDuration(seconds - 1));
      }, 1000);
    }

    if (seconds < 0) {
      // TODO: Handle notification
      if (currentTimer === 'work') {
        setCurrentTimer('break');
        setSeconds(breakDuration);
        setFormattedDuration(formatDuration(breakDuration));
      } else {
        setCurrentTimer('work');
        setSeconds(workDuration);
        setFormattedDuration(formatDuration(workDuration));
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // TODO: Request workDuration and breakDuration from the user

  const handleClosePomodoro = () => {
    setShowPomodoro(false);
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
      setBreakDuration={setBreakDuration} setFormattedDuration={setFormattedDuration} 
      isActive={isActive} setIsActive={setIsActive} />
    </div>
  )
}

export default Pomodoro;
