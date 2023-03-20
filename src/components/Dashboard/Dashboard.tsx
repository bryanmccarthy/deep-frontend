import './Dashboard.scss';
import DifficultyCountChart from './DifficultyCountChart/DifficultyCountChart';
import DifficultyTimeChart from './DifficultyTimeChart/DifficultyTimeChart';

function Dashboard() {

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
      <DifficultyCountChart />
      <DifficultyTimeChart />
    </div>
  )
}

export default Dashboard;
