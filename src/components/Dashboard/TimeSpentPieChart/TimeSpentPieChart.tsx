import "./TimeSpentPieChart.scss";
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3788d8', '#ffffff'];
const labelColor = "#FFAC1C";

type TimeSpentPieChartProps = {
  timeSpentData: any;
  milestone: number;
}

function TimeSpentPieChart({ timeSpentData, milestone }: TimeSpentPieChartProps) {
   
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
          label={timeSpentData}
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
