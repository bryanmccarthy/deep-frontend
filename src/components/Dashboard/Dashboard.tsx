import './Dashboard.scss';

type Style = {
  color: string;
  backgroundColor: string;
}

interface DashboardProps {
  style: Style;
}

function Dashboard({ style }: DashboardProps) {
  return (
    <div className="Dashboard" style={{color: style.color, backgroundColor: style.backgroundColor}}>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard;
