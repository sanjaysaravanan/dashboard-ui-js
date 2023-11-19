/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Sector,
  ResponsiveContainer,
} from 'recharts';
import { cutShortName, getRandomColor } from '../../utils/utils';

const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius,
    outerRadius, startAngle, endAngle, fill, payload, percent, value,
  } = props;
  return (
    <g>
      <text x={cx} y={cy} dy={-9} textAnchor="middle" fill="#000">
        {value}
      </text>
      <text x={cx} y={cy} dy={9} textAnchor="middle" fill={fill}>
        {cutShortName(payload.name)}
      </text>
      <text x={cx} y={cy} dy={27} textAnchor="middle" fill="#333">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      {/* <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" /> */}
      {/* <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 10}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`${payload.name}`}

      </text> */}
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 10}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`${(percent * 100).toFixed(2)}%`}

      </text> */}
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 10}
        y={ey}
        dy={36}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};

export default function CustomPieChart({ data, showBy, dataField }) {
  const [COLORS, _setColors] = useState([...Array(30)].map(() => getRandomColor()));
  const pieData = data.map(
    (dataObj) => ({ name: dataObj[showBy], value: dataObj[dataField] }),
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={500} height={300}>
        <Pie
          data={pieData}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          outerRadius={100}
          innerRadius={70}
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {pieData.map((_entry, index) => (
            <Cell
              // eslint-disable-next-line react/no-array-index-key
              key={`cell-${index}`}
              strokeWidth={5}
              fill={COLORS[index]}
            />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="top"
          payload={
            pieData.map(
              (item, index) => ({
                id: item.name,
                type: 'square',
                value: cutShortName(item.name),
                color: COLORS[index],
              }),
            )
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
