import "./TimeSpentPieChart.scss";
import { PieChart, Pie, Cell } from 'recharts';
import { useState } from "react";
import { useQuery } from "react-query";

const COLORS = ['#284579', '#ffffff'];

type TimeSpentPieChartProps = {
  timeSpent: number;
}

function TimeSpentPieChart({ timeSpent }: TimeSpentPieChartProps) {
  const [data, setData] = useState<any>([{}]);
  const [milestone, setMilestone] = useState<number>(0);

  function handleSetTimeSpentData() {
    setData([
      { name: "hours spent", value: secondsToHours(timeSpent) },
      { name: "hours to go", value: calculateHoursToGo(timeSpent) }, 
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
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    let x = 1 + cx + radius * Math.cos(-midAngle * RADIAN);
    let y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="#FFAC1C" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        { data[index].name === "hours spent" ?
          `${data[index].value} hours spent`
        :
          `${data[index].value} hours to go`
        }
      </text>
    );
  };

  const { status } = useQuery('setTimeSpentData', handleSetTimeSpentData);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <div className="TimeSpentPieChart">
      <PieChart
        width={300}
        height={300}
        margin={{
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        }}
      >
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          innerRadius={80}
          dataKey="value"
        >
          { data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <label>{`Milestone: ${milestone} hours`}</label>
    </div>
  )
}

export default TimeSpentPieChart;
