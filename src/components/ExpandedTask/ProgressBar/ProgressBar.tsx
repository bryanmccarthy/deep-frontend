import './ProgressBar.scss';
import { useState } from 'react';
import Slider from '@mui/material/Slider';

// const primary = "#ffffff";
const accent = "#000000";

function ProgressBar() {
  const [progress, setProgress] = useState<number>(0);

  function handleSliderChange(event: Event, value: number | number[]) {
    setProgress(value as number);
  }
  
  return (
    <div className="ProgressBar">
      <div className="ProgressLabel">Task Progress</div>
      <div className="ProgressSlider">
        <Slider
          value={progress}
          sx={{color: accent}}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          min={0}
          step={1}
          max={100}
        />
        <div className="ProgressNumber">{progress}%</div>
      </div>
    </div>
  )
}

export default ProgressBar;