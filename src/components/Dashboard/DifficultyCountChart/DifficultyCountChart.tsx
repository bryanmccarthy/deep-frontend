import "./DifficultyCountChart.scss";
// import axios from "axios";
import { PieChart, Pie, } from "recharts";

// TODO: value should be number of tasks with that difficulty
const data = [ // TODO: Use state instead and get data from backend
  { name: "1", value: 2 },
  { name: "2", value: 6 },
  { name: "3", value: 4 },
  { name: "4", value: 7 },
  { name: "5", value: 3 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${data[index].name}`}
    </text>
  );
};

function DifficultyCountChart() {

  return (
    <div className="DifficultyChart">
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
          dataKey="value"
          labelLine={false}
          fill="#284579"
          label={renderCustomizedLabel}
        >
        </Pie>
      </PieChart>
      <label>Number of Tasks per difficulty</label>
    </div>
  );
}

export default DifficultyCountChart;
