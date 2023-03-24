import "./DifficultyTimeChart.scss";
// import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { PieChart, Pie, } from "recharts";

type DifficultyTimeChartProps = {
  tasks: any;
}

function DifficultyTimeChart({ tasks }: DifficultyTimeChartProps) {
  const timePerDifficulty = new Map();
  const [difficultyTimeData, setDifficultyTimeData] = useState<any>(null);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${difficultyTimeData[index].name}`}
      </text>
    );
  };

  function handleSetDifficultyTime() {
    tasks.forEach((task: any) => {
      switch(task.difficulty) {
        case 1: {
          if (timePerDifficulty.get("1")) {
            if (task.time_spent > 0) timePerDifficulty.set("1", timePerDifficulty.get("1") + task.time_spent);
          } else {
            if (task.time_spent > 0) timePerDifficulty.set("1", task.time_spent);
          }
          break;
        } 
        case 2: {
          if (timePerDifficulty.get("2")) {
            if (task.time_spent > 0) timePerDifficulty.set("2", timePerDifficulty.get("2") + task.time_spent);
          } else {
            if (task.time_spent > 0) timePerDifficulty.set("2", task.time_spent);
          }
          break;
        } 
        case 3: {
          if (timePerDifficulty.get("3")) {
            if (task.time_spent > 0) timePerDifficulty.set("3", timePerDifficulty.get("3") + task.time_spent);
          } else {
            if (task.time_spent > 0) timePerDifficulty.set("3", task.time_spent);
          }
          break;
        } 
        case 4: {
          if (timePerDifficulty.get("4")) {
            if (task.time_spent > 0) timePerDifficulty.set("4", timePerDifficulty.get("4") + task.time_spent);
          } else {
            if (task.time_spent > 0) timePerDifficulty.set("4", task.time_spent);
          }
          break;      
        } 
        case 5: {
          if (timePerDifficulty.get("5")) {
            if (task.time_spent > 0) timePerDifficulty.set("5", timePerDifficulty.get("5") + task.time_spent);
          } else {
            if (task.time_spent > 0) timePerDifficulty.set("5", task.time_spent);
          }
          break;      
        } 
        default: {
          break;
        }
      };
    });
    setDifficultyTimeData(Array.from(timePerDifficulty, ([name, value]) => ({ name, value })));
  }
  
  const { status } = useQuery('setDifficultyTimeData', handleSetDifficultyTime);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <div className="DifficultyTimeChart">
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
          data={difficultyTimeData}
          dataKey="value"
          labelLine={false}
          fill="#284579"
          label={renderCustomizedLabel}
        > 
        </Pie> 
      </PieChart>
      <label>Time spent per Task difficulty</label>
    </div>
  );
}

export default DifficultyTimeChart;
