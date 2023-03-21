import "./TasksDoneScatterChart.scss";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { x: 1, y: 6 },
  { x: 2, y: 7 },
  { x: 3, y: 3 },
  { x: 4, y: 8 },
  { x: 5, y: 4 },
  { x: 4, y: 5 },
  { x: 3, y: 7 },
];

function TasksDoneScatterChart() {

  return (
    <div className="TasksDoneScatterChart">
      <ScatterChart
        width={500}
        height={300}
        margin={{
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        }}
      >
        {/* <CartesianGrid /> */}
        <XAxis dataKey="x" name="time" />
        <YAxis type="number" dataKey="y" name="difficulty" />
        <Tooltip cursor={{ strokeDasharray: '2 4' }} />
        <Scatter name="TasksDone" data={data} fill="#284579" />
      </ScatterChart>
    </div>
  );
}

export default TasksDoneScatterChart;
