import './Dashboard.scss';
import axios from 'axios';

function Dashboard() {

  async function makeRequest() {
    const res = await axios.get(import.meta.env.VITE_URL + '/user/time_spent', {
      withCredentials: true,
    });

    if (res.status === 200) {
      console.log(res.data);
    } else {
      console.log('error');
    }
  }


  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>
      <div className="TEST">

        <button onClick={makeRequest}>Get total time spent</button>

      </div>
    </div>
  )
}

export default Dashboard;
