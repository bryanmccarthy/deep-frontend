import "./TimeSpentBarChart.scss";
import { useState } from "react";
import { useQuery } from "react-query";

import { BarChart, Bar, XAxis, Tooltip } from 'recharts';

let barData = [
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
  const [data, setData] = useState<any>(barData);

  function setChartData() {
    const week = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    for (let i = 0; i < 7; i++) {
      if (localStorage.getItem(week[i])) {
        barData[i].time = parseInt(localStorage.getItem(week[i]) as string);
      }
    }

    setData(barData);
  }

  const { status } = useQuery('setChartData', setChartData);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

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
