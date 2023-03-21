import "./TimeSpentPieChart.scss";
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Hours spent', value: 40 },
  { name: 'Hours to go', value: 10 },
];

const COLORS = ['#284579', '#ffffff'];

function TimeSpentPieChart() {

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
          innerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <label>Total hours spent</label>
    </div>
  )
}

export default TimeSpentPieChart;
