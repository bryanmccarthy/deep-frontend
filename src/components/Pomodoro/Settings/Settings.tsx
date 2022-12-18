interface SettingsProps {
  setCurrentTimer: (timer: string) => void;
  setWorkDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
}

function Settings({ setCurrentTimer, setWorkDuration, setBreakDuration }: SettingsProps ) {

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
    <div className="settings">
      <h1>Settings</h1>
      <button className="workButton" onClick={handleWorkClick}>work</button>
      <button className="breakButton" onClick={handleBreakClick}>break</button>
    </div>
  )
}

export default Settings;
