import './Config.scss'
import Slider from '@mui/material/Slider';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import CancelIcon from '@mui/icons-material/Cancel';

interface ConfigProps {
  currentTimer: string;
  setCurrentTimer: (timer: string) => void;
  setSeconds: (seconds: number) => void;
  setFormattedDuration: (duration: string) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

const primary = "#faf9f6";
const accent = "#03243B";

function Config({ currentTimer, setCurrentTimer, setSeconds, setFormattedDuration, isActive, setIsActive }: ConfigProps ) {
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
          <Slider disabled={isActive ? true : false} value={workDuration} sx={{color: accent}} onChange={handleSliderChange} valueLabelDisplay="off" step={300} min={0} max={7200} />
        : 
          <Slider disabled={isActive ? true : false} value={breakDuration} sx={{color: accent}} onChange={handleSliderChange} valueLabelDisplay="off" step={60} min={0} max={1800} />
        }
      </div>
      <div className="TimerToggle">
        <button disabled={isActive ? true : false} className="TimerButton" 
          style={{
            backgroundColor: isActive && currentTimer === 'Work' ? '#ccc' : currentTimer === 'Work' ? accent : primary,
            color: isActive && currentTimer !== 'Work' ? '#ccc' : currentTimer === 'Work' ? primary : accent
          }} 
          onClick={handleWorkClick}>
            work
        </button>
        <button disabled={isActive ? true : false} className="TimerButton" 
          style={{
            backgroundColor: isActive && currentTimer === 'Break' ? '#ccc' : currentTimer === 'Break' ? accent : primary,
            color: isActive && currentTimer !== 'Break' ? '#ccc' : currentTimer === 'Break' ? primary : accent
          }} 
          onClick={handleBreakClick}>
            break
        </button>
      </div>
      <div className="StartStopSettings">
        { isActive ? <CancelIcon className="StartButton" onClick={handleStartStopClick} /> : <PlayCircleFilledIcon className="StartButton" onClick={handleStartStopClick} /> }
      </div>
    </div>
  )
}

export default Config;

export function formatDuration(time: number) {

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}
