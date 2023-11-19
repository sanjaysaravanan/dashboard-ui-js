import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { cutShortName } from '../../utils/utils';

export default function CustomBarChart({
  data, bars, xAxis, stackedBars,
}) {
  const modData = data.map((obj) => ({
    ...obj,
    [xAxis]: cutShortName(obj[xAxis]),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={modData}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xAxis}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars.map((barObj) => (
          <Bar
            dataKey={barObj.dataField}
            key={barObj.id}
            fill={barObj.color}
            stackId={stackedBars ? 'a' : undefined}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
