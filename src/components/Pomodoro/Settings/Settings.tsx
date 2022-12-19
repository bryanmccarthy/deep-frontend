import './Settings.scss'

interface SettingsProps {
  currentTimer: string;
  setCurrentTimer: (timer: string) => void;
  setWorkDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
}

function Settings({ currentTimer, setCurrentTimer, setWorkDuration, setBreakDuration }: SettingsProps ) {

  const handleWorkClick = () => {
    setCurrentTimer('work');
  }

  const handleBreakClick = () => {
    setCurrentTimer('break');
  }

  const handleWorkDurationChange = () => {
    setWorkDuration(60 * 60); // TODO: Request workDuration from the user
  }

  const handleBreakDurationChange = () => {
    setBreakDuration(5 * 60); // TODO: Request breakDuration from the user
  }

  return (
    <div className="Settings">
      <button className="Button" style={{backgroundColor: currentTimer === 'work' ? '#000' : '#fff', color: currentTimer === 'work' ? '#fff' : '#000'}} onClick={handleWorkClick}>work</button>
      <button className="Button" style={{backgroundColor: currentTimer === 'break' ? '#000' : '#fff', color: currentTimer === 'break' ? '#fff' : '#000'}} onClick={handleBreakClick}>break</button>
    </div>
  )
}

export default Settings;
