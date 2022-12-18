import Timer from './Timer/Timer';
import Settings from './Settings/Settings';
import { useState } from 'react';

function Pomodoro() {
  const [currentTimer, setCurrentTimer] = useState('work');
  const [workDuration, setWorkDuration] = useState(60 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);

  // TODO: Request workDuration and breakDuration from the user

  return (
    <div className="pomodoro">
      <Timer workDuration={workDuration} breakDuration={breakDuration} currentTimer={currentTimer} />
      <Settings setCurrentTimer={setCurrentTimer} setWorkDuration={setWorkDuration} setBreakDuration={setBreakDuration} />
    </div>
  )
}

export default Pomodoro;
