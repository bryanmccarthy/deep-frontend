import './ProgressBar.scss';
import axios from 'axios';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import InfoIcon from '@mui/icons-material/Info';

const accent = "#000000";

type ProgressBarProps = {
  expandedTaskID: number;
  expandedTaskProgress: number;
}

function ProgressBar({ expandedTaskID, expandedTaskProgress }: ProgressBarProps ) {
  const [progress, setProgress] = useState<number>(expandedTaskProgress);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  function handleSliderChange(event: Event, value: number | number[]) {
    setProgress(value as number);
  }

  async function handleSliderChangeCommited() {
    const res = await axios.put(import.meta.env.VITE_URL + '/tasks/update/progress', {
      task_id: expandedTaskID,
      progress: progress,
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

  function handleMouseOver() {
    setShowInfo(true);
  }

  function handleMouseOut() {
    setShowInfo(false);
  }
  
  return (
    <div className="ProgressBar">
      <div className="ProgressLabel">Task Progress</div>
      <div className="ProgressSlider">
        <InfoIcon className="InfoIcon" sx={{color: accent}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
        <Slider
          value={progress}
          sx={{color: accent}}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderChangeCommited}
          valueLabelDisplay="off"
          min={0}
          step={1}
          max={100}
        />
        <div className="ProgressNumber">{progress}%</div>
      </div>
      { showInfo &&
        <div className="ProgressInfo">
          Estimated time to complete: 1 hour { /* TODO: calculate this */ }
        </div>
      }
    </div>
  )
}

export default ProgressBar;