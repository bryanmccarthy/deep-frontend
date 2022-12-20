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
    setCurrentTimer('Work');
    setSeconds(workDuration);
    setFormattedDuration(formatDuration(workDuration))
  }

  const handleBreakClick = () => {
    setCurrentTimer('Break');
    setSeconds(breakDuration);
    setFormattedDuration(formatDuration(breakDuration))
  }

  const handleSliderChange = (event: Event, value: number | number[]) => {
    if (currentTimer === 'Work') {
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
    if (!isActive) {
      setIsActive(true);
      return;
    }

    setIsActive(false); // TODO: prompt user to confirm before stopping
    document.title='Deep';
    if (currentTimer === 'Work') {
      setSeconds(workDuration);
      setFormattedDuration(formatDuration(workDuration));
    } else {
     setSeconds(breakDuration);
      setFormattedDuration(formatDuration(breakDuration));
    }
  }

  return (
    <div className="Settings">
      <div className="DurationSettings">
        {currentTimer === 'Work' ? 
          <Slider disabled={isActive ? true : false} value={workDuration} onChange={handleSliderChange} valueLabelDisplay="off" step={300} min={0} max={7200} />
        : 
          <Slider disabled={isActive ? true : false} value={breakDuration} onChange={handleSliderChange} valueLabelDisplay="off" step={60} min={0} max={1800} />
        }
      </div>
      <div className="TimerSettings">
        <button disabled={isActive ? true : false} className="TimerButton" 
          style={{backgroundColor: isActive && currentTimer === 'Work' ? '#ccc' : currentTimer === 'Work' ? '#000' : '#fff',
                 color: isActive && currentTimer !== 'Work' ? '#ccc' : currentTimer === 'Work' ? '#fff' : '#000'}} 
          onClick={handleWorkClick}>
            work
        </button>
        <button disabled={isActive ? true : false} className="TimerButton" 
          style={{backgroundColor: isActive && currentTimer === 'Break' ? '#ccc' : currentTimer === 'Break' ? '#000' : '#fff',
                 color: isActive && currentTimer !== 'Break' ? '#ccc' : currentTimer === 'Break' ? '#fff' : '#000'}} 
          onClick={handleBreakClick}>
            break
        </button>
      </div>
      <div className="StartStopSettings">
        <button className="StartButton" onClick={handleStartStopClick}>{ isActive ? 'Cancel' : 'Start'}</button>
      </div>
    </div>
  )
}

export default Settings;

// TODO: Move to helper
export function formatDuration(time: number) {

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}
