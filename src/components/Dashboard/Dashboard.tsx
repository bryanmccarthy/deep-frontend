import './Dashboard.scss';
import DifficultyCountChart from './DifficultyCountChart/DifficultyCountChart';
import TimeSpentPieChart from './TimeSpentPieChart/TimeSpentPieChart';
import DifficultyTimeChart from './DifficultyTimeChart/DifficultyTimeChart';
import TimeSpentBarChart from './TimeSpentBarChart/TimeSpentBarChart';
import TaskData from './TaskData/TaskData';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from "axios";

type DashboardProps = {
  tasks: any;
}

function Dashboard({ tasks }: DashboardProps) {
  const [timeSpentData, setTimeSpentData] = useState<any>([{}]);
  const [milestone, setMilestone] = useState<number>(0);

  function handleSetTimeSpentData(timeSpent: number) {
    const hoursSpent = secondsToHours(timeSpent);
    const hoursToGo = calculateHoursToGo(timeSpent);
    
    setTimeSpentData([
      { name: "hours spent", value: hoursSpent },
      { name: "hours to go", value: hoursToGo }, 
    ]);
  }

  function calculateHoursToGo(timeSpent: number) {
    const hours = secondsToHours(timeSpent);

    if (hours < 5) {
      setMilestone(5);
      return(5 - hours);
    } else if (hours < 10) {
      setMilestone(10);
      return(10 - hours);
    } else if (hours < 25) {
      setMilestone(25);
      return(25 - hours);
    } else if (hours < 50) {
      setMilestone(50);
      return(50 - hours);
    } else {
      setMilestone((Math.floor(hours / 50) + 1) * 50);
      return(((Math.floor(hours / 50) + 1) * 50) - hours);
    }
  }

  function secondsToHours(seconds: number) {
    return Math.floor((seconds / 60) / 60);
  }

  async function handleGetTotalTimeSpent() {
    const res = await axios.get(import.meta.env.VITE_URL + '/user/time_spent', {
      withCredentials: true,
    });

    if (res.status === 200) {
      handleSetTimeSpentData(res.data);
    } else {
      console.log('error');
    }
  }

  const { status } = useQuery('setTimeSpentData', handleGetTotalTimeSpent);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;
   
  return (
    <div className="Dashboard">
      <div className="Grid1">
        <DifficultyCountChart tasks={tasks}/>
        <TimeSpentPieChart timeSpentData={timeSpentData} milestone={milestone} />
        <DifficultyTimeChart tasks={tasks} />
      </div>
      <div className="Grid2">
        <TimeSpentBarChart />
        <TaskData />
      </div>
    </div>
  )
}

export default Dashboard;
