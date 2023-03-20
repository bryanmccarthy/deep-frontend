import "./DifficultyChart.scss";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";

const data = [ // TODO: Use state instead and get data from backend
  { name: "Difficulty 1", value: 2 },
  { name: "Difficulty 2", value: 7 },
  { name: "Difficulty 3", value: 4 },
  { name: "Difficulty 4", value: 12 },
  { name: "Difficulty 5", value: 4 },
  { name: "Difficulty 6", value: 9 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000", "#000000"];

function DifficultyChart() {

  // TODO: Get how many tasks are in each difficulty

  return (
    <div className="DifficultyChart">
      <PieChart width={400} height={400}>
        <Pie 
          data={data} 
          dataKey="value"
          label={entry => entry.name}
          outerRadius={80}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export default DifficultyChart;