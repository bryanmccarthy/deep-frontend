import "./TimeSpentBarChart.scss";

import { BarChart, Bar, XAxis, Tooltip } from 'recharts';

const data = [
  {
    name: 'Sun',
    time: 0,
  },
  {
    name: 'Mon',
    time: 0,
  },
  {
    name: 'Tue',
    time: 0,
  },
  {
    name: 'Wed',
    time: 0,
  },
  {
    name: 'Thu',
    time: 0,
  },
  {
    name: 'Fri',
    time: 0,
  },
  {
    name: 'Sat',
    time: 0,
  },
];

function TimeSpentBarChart() {

  return (
    <div className="TimeSpentBarChart">
      <BarChart
        width={1000}
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
        <Bar dataKey="time" fill="#3788d8" />
      </BarChart>
    </div>
  );
}

export default TimeSpentBarChart;
