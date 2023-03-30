import './ProgressBar.scss';
import axios from 'axios';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import InfoIcon from '@mui/icons-material/Info';

const accent = "#000000";
let difficultyTimes: Map<number, string> = new Map();
difficultyTimes.set(1, '20-30 mins');
difficultyTimes.set(2, '30-60 mins');
difficultyTimes.set(3, '1-2 hrs');
difficultyTimes.set(4, '2-4 hrs');
difficultyTimes.set(5, '4-6 hrs');

type ProgressBarProps = {
  expandedTaskID: number;
  expandedTaskProgress: number;
  expandedTaskDifficulty: number;
  expandedTaskTimeSpent: number;
  timeRemaining: number;
}

function ProgressBar({ expandedTaskID, expandedTaskProgress, expandedTaskDifficulty, expandedTaskTimeSpent, timeRemaining }: ProgressBarProps ) {
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
    }
  }

  function handleMouseOver() {
    setShowInfo(true);
  }

  function handleMouseOut() {
    setShowInfo(false);
  }

  function formatMinutes(minutes: number) {
    if (minutes === 0) return '0 mins';

    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    if (hours === 0) {
      if (minutes > 1) {
        return minutes + ' mins';
      } else {
        return minutes + ' min';
      }
    }

    if (hours > 1) {
      if (minutes > 1) {
        return hours + ' hrs ' + minutes + ' mins';
      } else {
        return hours + ' hrs ' + minutes + ' min';
      }
    } else {
      if (minutes > 1) {
        return hours + ' hr ' + minutes + ' mins';
      } else {
        return hours + ' hr ' + minutes + ' min';
      }
    }
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
      { showInfo ?
        <div className="ProgressDescription">
          <p>Track your progress to get a more accurate estimation of your time remaining.</p>
        </div>
        :
        <div className="ProgressInfo">
          <p style={{ paddingRight: '1em' }}>Difficulty: {expandedTaskDifficulty} ({difficultyTimes.get(expandedTaskDifficulty)})</p>
          <p style={{ paddingRight: '1em' }}>Time spent: {formatMinutes(Math.floor(expandedTaskTimeSpent / 60))}</p>
          <p style={{ paddingLeft: '1em' }}>Time remaining: {formatMinutes(timeRemaining)}</p>
        </div>
      }
    </div>
  )
}

export default ProgressBar;