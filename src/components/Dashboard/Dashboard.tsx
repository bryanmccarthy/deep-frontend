import './Dashboard.scss';
import DifficultyChart from './DifficultyChart/DifficultyChart';

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
      <DifficultyChart />
    </div>
  )
}

export default Dashboard;
