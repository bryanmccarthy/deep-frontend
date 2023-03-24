import "./TimeSpentPieChart.scss";
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#284579', '#f0f5fc'];
const labelColor = "#FFAC1C";

type TimeSpentPieChartProps = {
  timeSpent: number;
  timeSpentData: any;
  milestone: number;
}

function TimeSpentPieChart({ timeSpent, timeSpentData, milestone }: TimeSpentPieChartProps) {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    let x = 1 + cx + radius * Math.cos(-midAngle * RADIAN);
    let y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill={labelColor} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        { timeSpentData[index].name === "hours spent" ?
          `${timeSpentData[index].value} hours spent`
        :
          `${timeSpentData[index].value} hours to go`
        }
      </text>
    );
  };
 
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
          data={timeSpentData}
          labelLine={false}
          label={renderCustomizedLabel}
          innerRadius={80}
          dataKey="value"
        >
          { timeSpentData.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <label>{`Milestone: ${milestone} hours`}</label>
    </div>
  )
}

export default TimeSpentPieChart;
