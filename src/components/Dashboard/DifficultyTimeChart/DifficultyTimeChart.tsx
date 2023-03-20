import "./DifficultyTimeChart.scss";
// import axios from "axios";
import { ResponsiveContainer, PieChart, Pie, } from "recharts";

const data = [ // TODO: Use state instead and get data from backend
  { name: "Difficulty 1", value: 2 },
  { name: "Difficulty 2", value: 7 },
  { name: "Difficulty 3", value: 4 },
  { name: "Difficulty 4", value: 12 },
  { name: "Difficulty 5", value: 4 },
  { name: "Difficulty 6", value: 9 },
];

function DifficultyTimeChart() {

  return (
    <div className="DifficultyTimeChart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={data} 
            dataKey="value"
            labelLine={false}
            fill="#8884d8"
            label={entry => entry.name}
          >
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DifficultyTimeChart;
