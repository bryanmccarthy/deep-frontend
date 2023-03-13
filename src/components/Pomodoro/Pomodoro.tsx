import './Pomodoro.scss'
import Config from './Config/Config';
import { formatDuration } from './Config/Config';
import axios from 'axios';
import { useEffect, useState } from 'react';

type PomodoroProps = {
  showPomodoro: boolean;
  setShowPomodoro: (show: boolean) => void;
  errorSnackbarOpen: boolean;
  setErrorSnackbarOpen: (open: boolean) => void;
  page: string;
  expandedTaskID: number;
  setExpandedTaskTimeSpent: (timeSpent: number) => void;
}

function Pomodoro({ showPomodoro, setShowPomodoro, errorSnackbarOpen, setErrorSnackbarOpen, page, expandedTaskID, setExpandedTaskTimeSpent }: PomodoroProps) {
  const workDuration: number = localStorage.getItem('workDuration') ? parseInt(localStorage.getItem('workDuration') as string) : 25 * 60;
  const breakDuration: number = localStorage.getItem('breakDuration') ? parseInt(localStorage.getItem('breakDuration') as string) : 5 * 60;

  const [currentTimer, setCurrentTimer] = useState<string>('Work');
  const [seconds, setSeconds] = useState<number>(workDuration);
  const [formattedDuration, setFormattedDuration] = useState<string>(formatDuration(workDuration));
  const [isActive, setIsActive] = useState<boolean>(false);
  const [expandedTaskDuration, setExpandedTaskDuration] = useState<number>(0);

  async function handleUpdateTimeSpent() {
    const res = await axios.put(import.meta.env.VITE_URL + '/user/update/time_spent', {
      time_spent: workDuration,
    },
    {
      withCredentials: true,
    });

    if (res.status !== 200) {
      setErrorSnackbarOpen(true);
    }
  }

  async function handleUpdateExpandedtaskTimeSpent(timeSpent: number) {
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
        
        if (page === 'expandedTask') {
          console.log(expandedTaskID);
          setExpandedTaskDuration(expandedTaskDuration + 1);
          console.log(expandedTaskDuration);
        } else if (page !== 'expandedTask' && expandedTaskDuration !== 0) {
          handleUpdateExpandedtaskTimeSpent(expandedTaskDuration);
          console.log('updating time spent' + expandedTaskDuration);
          setExpandedTaskDuration(0);
        }

        setSeconds(seconds - 1);
      }, 1000);
    }

    if (seconds < 0) {
      // TODO: Handle notification
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
        handleUpdateExpandedTaskTimeSpent={handleUpdateExpandedtaskTimeSpent} 
        expandedTaskDuration={expandedTaskDuration} 
      />
    </div>
  )
}

export default Pomodoro;
