import { useEffect, useState } from 'react';
import './Timer.scss';

interface TimerProps {
  workDuration: number;
  breakDuration: number;
  currentTimer: string;
}

function Timer({ workDuration, breakDuration, currentTimer }: TimerProps) {
  const [seconds, setSeconds] = useState(currentTimer === 'work' ? workDuration : breakDuration);
  const [formattedDuration, setFormattedDuration] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds === 0) {
        clearInterval(countdown);
        setIsActive(false);
      }
      setSeconds(seconds - 1);
      formatDuration(seconds);
    }, 1000);

    return () => clearInterval(countdown);
  }, [seconds]);

  const formatDuration = (time: number) => {
    if (!isActive) {
      setFormattedDuration('done');
      return;
    }

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    setFormattedDuration(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
  }

  return (
    <div className="Timer">
      <h1>{ formattedDuration }</h1>
    </div>
  )
}

export default Timer;
