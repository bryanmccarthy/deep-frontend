function Settings({ setCurrentTimer }: { setCurrentTimer: (timer: string) => void }) {

  const handleWorkClick = () => {
    setCurrentTimer('work');
  }

  const handleBreakClick = () => {
    setCurrentTimer('break');
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
