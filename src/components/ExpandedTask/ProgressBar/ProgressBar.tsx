import './ProgressBar.scss';
import axios from 'axios';
import { useState } from 'react';
import Slider from '@mui/material/Slider';

// const primary = "#ffffff";
const accent = "#000000";

type ProgressBarProps = {
  expandedTaskID: number;
  expandedTaskProgress: number;
}

function ProgressBar({ expandedTaskID, expandedTaskProgress }: ProgressBarProps ) {
  const [progress, setProgress] = useState<number>(expandedTaskProgress);

  async function handleSliderChange(event: Event, value: number | number[]) {
    setProgress(value as number);
    console.log(expandedTaskID);

    const res = await axios.put(import.meta.env.VITE_URL + '/tasks/update/progress', {
      task_id: expandedTaskID,
      progress: value as number,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      console.log('updated progress');
    } else {
      console.log('error updating progress');
      // Snackbar
    }
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