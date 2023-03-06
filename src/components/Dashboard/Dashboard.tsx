import './Dashboard.scss';
import axios from 'axios';

function Dashboard() {

  async function makeRequest() {
    const res = await axios.put(import.meta.env.VITE_URL + '/user/update/time_spent', {
      time_spent: 600,
    },
    {
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

        <button onClick={makeRequest}>Make Request</button>

      </div>
    </div>
  )
}

export default Dashboard;
