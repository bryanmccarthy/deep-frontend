import './Dashboard.scss';
import DifficultyCountChart from './DifficultyCountChart/DifficultyCountChart';
import TimeSpentPieChart from './TimeSpentPieChart/TimeSpentPieChart';
import DifficultyTimeChart from './DifficultyTimeChart/DifficultyTimeChart';
import TasksDoneScatterChart from './TasksDoneScatterChart/TasksDoneScatterChart';
import TimeSpentBarChart from './TimeSpentBarChart/TimeSpentBarChart';
// import { useState } from 'react';
import { useQuery } from 'react-query';

type DashboardProps = {
  tasks: any;
}

function Dashboard({ tasks }: DashboardProps) {
  // async function handleGetTotalTimeSpent() {
  //   const res = await axios.get(import.meta.env.VITE_URL + '/user/time_spent', {
  //     withCredentials: true,
  //   });

  //   if (res.status === 200) {
  //     console.log(res.data);
  //   } else {
  //     console.log('error');
  //   }
  // }
   
  return (
    <div className="Dashboard">
      <div className="Grid1">
        <DifficultyCountChart tasks={tasks}/>
        <TimeSpentPieChart />
        <DifficultyTimeChart />
      </div>
      <div className="Grid2">
        <TasksDoneScatterChart />
        <TimeSpentBarChart />
      </div>
    </div>
  )
}

export default Dashboard;
