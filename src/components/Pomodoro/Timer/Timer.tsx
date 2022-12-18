import { useEffect, useState } from 'react';
import './Timer.scss';

interface TimerProps {
  workDuration: number;
  breakDuration: number;
  currentTimer: string;
}

function Timer({ workDuration, breakDuration, currentTimer }: TimerProps) {
  const [seconds, setSeconds] = useState(currentTimer === 'work' ? workDuration : breakDuration); // TODO: Set seconds globally
  const [formattedDuration, setFormattedDuration] = useState('');

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(seconds - 1);
      formatDuration(seconds);
    }, 1000);

    return () => clearInterval(countdown);
  }, [seconds]);

  const formatDuration = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    setFormattedDuration(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
  }

  return (
    <div className="timer">
      <h1>{seconds > 0 ? formattedDuration : 'done'}</h1>
    </div>
  )
}

export default Timer;
