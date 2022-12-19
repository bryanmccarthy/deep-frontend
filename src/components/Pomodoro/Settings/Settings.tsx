import './Settings.scss'

interface SettingsProps {
  currentTimer: string;
  setCurrentTimer: (timer: string) => void;
  setSeconds: (seconds: number) => void;
  workDuration: number;
  setWorkDuration: (duration: number) => void;
  breakDuration: number;
  setBreakDuration: (duration: number) => void;
  setFormattedDuration: (duration: string) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

function Settings({ currentTimer, setCurrentTimer, setSeconds, workDuration, setWorkDuration, breakDuration, setBreakDuration, setFormattedDuration, isActive, setIsActive }: SettingsProps ) {

  const handleWorkClick = () => {
    setCurrentTimer('work');
    setSeconds(workDuration);
    setFormattedDuration(formatDuration(workDuration))
  }

  const handleBreakClick = () => {
    setCurrentTimer('break');
    setSeconds(breakDuration);
    setFormattedDuration(formatDuration(breakDuration))
  }

  const handleWorkDurationChange = () => {
    setWorkDuration(workDuration + 100); // TODO: handle change
    if (currentTimer === 'work') setFormattedDuration(formatDuration(workDuration + 100));
  }

  const handleBreakDurationChange = () => {
    setBreakDuration(breakDuration + 100); // TODO: handle change
    if (currentTimer === 'break') setFormattedDuration(formatDuration(breakDuration + 100));
  }

  const handleStartStopClick = () => {
    setIsActive(!isActive);
  }

  const formatDuration = (time: number) => {

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  return (
    <div className="Settings">
      <div className="TimerSettings">
        <button className="Button" style={{backgroundColor: currentTimer === 'work' ? '#000' : '#fff', color: currentTimer === 'work' ? '#fff' : '#000'}} onClick={handleWorkClick}>work</button>
        <button className="Button" style={{backgroundColor: currentTimer === 'break' ? '#000' : '#fff', color: currentTimer === 'break' ? '#fff' : '#000'}} onClick={handleBreakClick}>break</button>
      </div>
      <div className="DurationSettings">
        <button className="Button" style={{border: '1px solid black'}} onClick={handleWorkDurationChange}>Change Work</button>
        <button className="Button" style={{border: '1px solid black'}} onClick={handleBreakDurationChange}>Change Break</button>
      </div>
      <div className="StartStopSettings">
        <button className="Button" onClick={handleStartStopClick}>{ isActive ? 'Stop' : 'Start'}</button>
      </div>
    </div>
  )
}

export default Settings;
