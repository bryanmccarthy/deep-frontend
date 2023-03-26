import './Dashboard.scss';
import DifficultyCountChart from './DifficultyCountChart/DifficultyCountChart';
import TimeSpentPieChart from './TimeSpentPieChart/TimeSpentPieChart';
import DifficultyTimeChart from './DifficultyTimeChart/DifficultyTimeChart';
import TimeSpentBarChart from './TimeSpentBarChart/TimeSpentBarChart';
import TaskData from './TaskData/TaskData';

type DashboardProps = {
  tasks: any;
}

function Dashboard({ tasks }: DashboardProps) {
   
  return (
    <div className="Dashboard">
      <div className="Grid1">
        <DifficultyCountChart tasks={tasks}/>
        <TimeSpentPieChart />
        <DifficultyTimeChart tasks={tasks} />
      </div>
      <div className="Grid2">
        <TimeSpentBarChart />
        <TaskData tasks={tasks} />
      </div>
    </div>
  )
}

export default Dashboard;
