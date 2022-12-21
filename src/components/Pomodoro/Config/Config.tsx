import './Config.scss'
import Slider from '@mui/material/Slider';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';

interface SettingsProps {
  currentTimer: string;
  setCurrentTimer: (timer: string) => void;
  setSeconds: (seconds: number) => void;
  setFormattedDuration: (duration: string) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

function Settings({ currentTimer, setCurrentTimer, setSeconds, 
                    setFormattedDuration, isActive, setIsActive }: SettingsProps ) {
  const workDuration: number = localStorage.getItem('workDuration') ? parseInt(localStorage.getItem('workDuration') as string) : 25 * 60;
  const breakDuration: number = localStorage.getItem('breakDuration') ? parseInt(localStorage.getItem('breakDuration') as string) : 5 * 60;

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
      localStorage.setItem('workDuration', value as unknown as string);
      setSeconds(value as number);
      setFormattedDuration(formatDuration(value as number));
    }
    else {
      localStorage.setItem('breakDuration', value as unknown as string);
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
    <div className="Config">
      <div className="DurationSettings">
        {currentTimer === 'Work' ? 
          <Slider disabled={isActive ? true : false} value={workDuration} sx={{color: 'navy'}} onChange={handleSliderChange} valueLabelDisplay="off" step={300} min={0} max={7200} />
        : 
          <Slider disabled={isActive ? true : false} value={breakDuration} sx={{color: 'navy'}} onChange={handleSliderChange} valueLabelDisplay="off" step={60} min={0} max={1800} />
        }
      </div>
      <div className="TimerToggle">
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
