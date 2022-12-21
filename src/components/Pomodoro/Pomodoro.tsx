import './Pomodoro.scss'
import Settings from './Settings/Settings';
import { formatDuration } from './Settings/Settings';
import { useEffect, useState, useRef } from 'react';

interface PomodoroProps {
  showPomodoro: boolean;
  setShowPomodoro: (show: boolean) => void;
}

function Pomodoro({ showPomodoro, setShowPomodoro }: PomodoroProps) {
  const ref = useRef<HTMLInputElement>(null);
  const workDuration: number = localStorage.getItem('workDuration') ? parseInt(localStorage.getItem('workDuration') as string) : 25 * 60;
  const breakDuration: number = localStorage.getItem('breakDuration') ? parseInt(localStorage.getItem('breakDuration') as string) : 5 * 60;

  const [currentTimer, setCurrentTimer] = useState<string>('Work');
  const [seconds, setSeconds] = useState<number>(workDuration);
  const [formattedDuration, setFormattedDuration] = useState<string>(formatDuration(workDuration));
  const [isActive, setIsActive] = useState<boolean>(false);
  
  console.log('seconds: ', seconds);
  console.log('isActive: ', isActive);
  console.log('currentTimer: ', currentTimer);
  console.log('workDuration: ', workDuration);
  console.log('breakDuration: ', breakDuration);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds >= 0) {
      interval = setInterval(() => {
        let formattedDuration = formatDuration(seconds - 1);
        setFormattedDuration(formattedDuration);
        document.title = `${currentTimer}: ${formattedDuration}`;

        setSeconds(seconds - 1);
      }, 1000);
    }

    if (seconds < 0) {
      // TODO: Handle notification
      if (currentTimer === 'Work') {
        setCurrentTimer('Break');
        setSeconds(breakDuration);
        setFormattedDuration(formatDuration(breakDuration));
      } else {
        setCurrentTimer('Work');
        setSeconds(workDuration);
        setFormattedDuration(formatDuration(workDuration));
      }

      document.title = 'Deep';
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // TODO: Request workDuration and breakDuration from the user

  const handleClosePomodoro = () => {
    setShowPomodoro(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowPomodoro(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div ref={ref} className="Pomodoro" style={{ visibility: showPomodoro ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleClosePomodoro}>&times;</button>
      <div className="Timer">
        <h1 className="FormattedDuration">{ formattedDuration }</h1>
      </div>
      <Settings currentTimer={currentTimer} setCurrentTimer={setCurrentTimer} 
      setSeconds={setSeconds} setFormattedDuration={setFormattedDuration} 
      isActive={isActive} setIsActive={setIsActive} />
    </div>
  )
}

export default Pomodoro;
