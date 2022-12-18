import Timer from './Timer/Timer';
import Settings from './Settings/Settings';
import { useState } from 'react';

function Pomodoro() {
  const [currentTimer, setCurrentTimer] = useState('work');
  // TODO: Request workTime and breakTime from the user

  console.log(currentTimer);

  return (
    <div className="pomodoro">
      <h1>Pomodoro</h1>
      <Timer />
      <Settings setCurrentTimer={setCurrentTimer} />
    </div>
  )
}

export default Pomodoro;
