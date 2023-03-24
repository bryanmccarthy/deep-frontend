import "./TimeSpentBarChart.scss";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  {
    name: 'Sun',
    time: 5,
  },
  {
    name: 'Mon',
    time: 6,
  },
  {
    name: 'Tue',
    time: 2,
  },
  {
    name: 'Wed',
    time: 8,
  },
  {
    name: 'Thu',
    time: 4,
  },
  {
    name: 'Fri',
    time: 5,
  },
  {
    name: 'Sat',
    time: 3,
  },
];

function TimeSpentBarChart() {

  return (
    <div className="TimeSpentBarChart">
      <BarChart
        width={1100}
        height={350}
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="time" fill="#284579" />
      </BarChart>
    </div>
  );
}

export default TimeSpentBarChart;
