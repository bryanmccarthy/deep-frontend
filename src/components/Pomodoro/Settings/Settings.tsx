import './Settings.scss'
import Slider from '@mui/material/Slider';

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

function Settings({ currentTimer, setCurrentTimer, setSeconds, workDuration, 
                    setWorkDuration, breakDuration, setBreakDuration, setFormattedDuration, 
                    isActive, setIsActive }: SettingsProps ) {

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

  const handleSliderChange = (event: Event, value: number | number[]) => {
    console.log('Slider changed');
    if (currentTimer === 'work') {
      setWorkDuration(value as number);
      setSeconds(value as number);
      setFormattedDuration(formatDuration(value as number));
    }
    else {
      setBreakDuration(value as number);
      setSeconds(value as number);
      setFormattedDuration(formatDuration(value as number));
    }
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
      <div className="DurationSettings">
        {currentTimer === 'work' ? 
          <Slider value={workDuration} onChange={handleSliderChange} valueLabelDisplay="off" step={300} min={0} max={7200} />
        : 
          <Slider value={breakDuration} onChange={handleSliderChange} valueLabelDisplay="off" step={60} min={0} max={1800} />
        }
      </div>
      <div className="TimerSettings">
        <button className="Button" style={{backgroundColor: currentTimer === 'work' ? '#000' : '#fff', color: currentTimer === 'work' ? '#fff' : '#000'}} onClick={handleWorkClick}>work</button>
        <button className="Button" style={{backgroundColor: currentTimer === 'break' ? '#000' : '#fff', color: currentTimer === 'break' ? '#fff' : '#000'}} onClick={handleBreakClick}>break</button>
      </div>
      <div className="StartStopSettings">
        <button className="StartButton" onClick={handleStartStopClick}>{ isActive ? 'Stop' : 'Start'}</button>
      </div>
    </div>
  )
}

export default Settings;
