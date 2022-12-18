import { useEffect, useState } from 'react';
import './Timer.scss';

function Timer() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [seconds]);

  return (
    <div className="timer">
      <h1>{seconds > 0 ? seconds : 'done'}</h1>
    </div>
  )
}

export default Timer;
