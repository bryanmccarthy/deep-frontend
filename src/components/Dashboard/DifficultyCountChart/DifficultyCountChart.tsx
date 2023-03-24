import "./DifficultyCountChart.scss";
import { useState } from "react";
import { useQuery } from "react-query";
import { PieChart, Pie, } from "recharts";

const labelColor = "#FFAC1C";

type DifficultyCountChartProps = {
  tasks: any;
}

function DifficultyCountChart({ tasks }: DifficultyCountChartProps) {
  const tasksPerDifficulty = new Map();
  const [difficultyCountData, setDifficultyCountData] = useState<any>([{}]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fontSize={18} fill={labelColor} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${difficultyCountData[index].name}`}
      </text>
    );
  }; 

  // DifficultyCount parse
  function handleSetDifficultyCount() { 
    tasks.forEach((task: any) => {
      switch(task.difficulty) {
        case 1: {
          if (tasksPerDifficulty.get("1")) {
            tasksPerDifficulty.set("1", tasksPerDifficulty.get("1") + 1);
          } else {
            tasksPerDifficulty.set("1", 1);
          }
          break;
        } 
        case 2: {
          if (tasksPerDifficulty.get("2")) {
            tasksPerDifficulty.set("2", tasksPerDifficulty.get("2") + 1);
          } else {
            tasksPerDifficulty.set("2", 1);
          }
          break;
        } 
        case 3: {
          if (tasksPerDifficulty.get("3")) {
            tasksPerDifficulty.set("3", tasksPerDifficulty.get("3") + 1);
          } else {
            tasksPerDifficulty.set("3", 1);
          }
          break;
        } 
        case 4: {
          if (tasksPerDifficulty.get("4")) {
            tasksPerDifficulty.set("4", tasksPerDifficulty.get("4") + 1);
          } else {
            tasksPerDifficulty.set("4", 1);
          }
          break;      
        } 
        case 5: {
          if (tasksPerDifficulty.get("5")) {
            tasksPerDifficulty.set("5", tasksPerDifficulty.get("5") + 1);
          } else {
            tasksPerDifficulty.set("5", 1);
          }
          break;      
        } 
        default: {
          break;
        }
      };
    });
    setDifficultyCountData(Array.from(tasksPerDifficulty, ([name, value]) => ({ name, value })));
  }
  
  const { status } = useQuery('setData', handleSetDifficultyCount);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;


  return (
    <div className="DifficultyChart">
      { tasks.length === 0 ?
          <div className="NoTasks"><p>no tasks</p></div>
      :
        <div>
          <div>
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
                data={difficultyCountData} 
                dataKey="value"
                labelLine={false}
                fill="#3788d8"
                label={renderCustomizedLabel}
              >
              </Pie>
            </PieChart>
          </div>
        <label>Number of Tasks per difficulty</label>
      </div>
    }
    </div>
  );
}

export default DifficultyCountChart;
