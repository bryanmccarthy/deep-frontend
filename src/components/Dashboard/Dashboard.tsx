import './Dashboard.scss';
import DifficultyCountChart from './DifficultyCountChart/DifficultyCountChart';
import TimeSpentPieChart from './TimeSpentPieChart/TimeSpentPieChart';
import DifficultyTimeChart from './DifficultyTimeChart/DifficultyTimeChart';
import TimeSpentBarChart from './TimeSpentBarChart/TimeSpentBarChart';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from "axios";

type DashboardProps = {
  tasks: any;
}

function Dashboard({ tasks }: DashboardProps) {
  const [timeSpent, setTimeSpent] = useState<number>(0);

  async function handleGetTotalTimeSpent() {
    const res = await axios.get(import.meta.env.VITE_URL + '/user/time_spent', {
      withCredentials: true,
    });

    if (res.status === 200) {
      setTimeSpent(res.data);
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
        <TimeSpentPieChart timeSpent={timeSpent} />
        <DifficultyTimeChart tasks={tasks} />
      </div>
      <div className="Grid2">
        <TimeSpentBarChart />
      </div>
    </div>
  )
}

export default Dashboard;
