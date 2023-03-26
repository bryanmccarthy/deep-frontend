import './Pomodoro.scss'
import Config from './Config/Config';
import { formatDuration } from './Config/Config';
import axios from 'axios';
import { useEffect, useState } from 'react';

type PomodoroProps = {
  showPomodoro: boolean;
  setShowPomodoro: (show: boolean) => void;
  setErrorSnackbarOpen: (open: boolean) => void;
  page: string;
  expandedTaskID: number;
  setExpandedTaskTimeSpent: (timeSpent: number) => void;
}

function Pomodoro({ showPomodoro, setShowPomodoro, setErrorSnackbarOpen, page, expandedTaskID, setExpandedTaskTimeSpent }: PomodoroProps) {
  const workDuration: number = localStorage.getItem('workDuration') ? parseInt(localStorage.getItem('workDuration') as string) : 25 * 60;
  const breakDuration: number = localStorage.getItem('breakDuration') ? parseInt(localStorage.getItem('breakDuration') as string) : 5 * 60;

  const [currentTimer, setCurrentTimer] = useState<string>('Work');
  const [seconds, setSeconds] = useState<number>(workDuration);
  const [formattedDuration, setFormattedDuration] = useState<string>(formatDuration(workDuration));
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [expandedTaskDuration, setExpandedTaskDuration] = useState<number>(0);

  async function handleUpdateTimeSpent() {
    const res = await axios.put(import.meta.env.VITE_URL + '/user/update/time_spent', {
      time_spent: timeElapsed,
    },
    {
      withCredentials: true,
    });

    if (res.status !== 200) {
      setErrorSnackbarOpen(true);
    }

    // TODO: update time for current day locally

  }

  async function handleUpdateExpandedtaskTimeSpent(timeSpent: number) {
    if (timeSpent === 0) return;

    console.log(timeSpent);
    const res = await axios.put(import.meta.env.VITE_URL + '/tasks/update/time_spent', {
      id: expandedTaskID,
      time_spent: timeSpent,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      setExpandedTaskTimeSpent(res.data.time_spent);
      setExpandedTaskDuration(0);
    } else {
      setErrorSnackbarOpen(true);
    }
  }

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds >= 0) {
      interval = setInterval(() => {
        let formattedDuration = formatDuration(seconds - 1);
        setFormattedDuration(formattedDuration);
        document.title = `${currentTimer}: ${formattedDuration}`;
        
        if (page === 'expandedTask' && currentTimer === 'Work') {
          setExpandedTaskDuration(expandedTaskDuration + 1);
        } else if (page !== 'expandedTask' && expandedTaskDuration !== 0) {
          handleUpdateExpandedtaskTimeSpent(expandedTaskDuration);
          setExpandedTaskDuration(0);
        }

        setSeconds(seconds - 1);
        setTimeElapsed(timeElapsed + 1);
      }, 1000);
    }

    if (seconds < 0) {
      if (currentTimer === 'Work') {
        handleUpdateTimeSpent();
        setCurrentTimer('Break');
        setSeconds(breakDuration);
        setFormattedDuration(formatDuration(breakDuration));
      } else {
        setCurrentTimer('Work');
        setSeconds(workDuration);
        setFormattedDuration(formatDuration(workDuration));
      }

      document.title = 'Deep';
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  function handleClosePomodoro() {
    setShowPomodoro(false);
  }

  return (
    <div className="Pomodoro" style={{ visibility: showPomodoro ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleClosePomodoro}>&times;</button>
      <div className="Timer">
        <h1 className="FormattedDuration">{ formattedDuration }</h1>
      </div>
      <Config 
        currentTimer={currentTimer} 
        setCurrentTimer={setCurrentTimer} 
        setSeconds={setSeconds} 
        setFormattedDuration={setFormattedDuration} 
        isActive={isActive} 
        setIsActive={setIsActive}
        handleUpdateTimeSpent={handleUpdateTimeSpent}
        handleUpdateExpandedTaskTimeSpent={handleUpdateExpandedtaskTimeSpent} 
        expandedTaskDuration={expandedTaskDuration} 
      />
    </div>
  )
}

export default Pomodoro;
