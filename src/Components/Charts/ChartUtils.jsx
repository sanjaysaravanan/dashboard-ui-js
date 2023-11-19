import React from 'react';
import { cutShortName } from '../../utils/utils';

export function CustomizedAxisTick(props) {
  const {
    x, y, payload,
  } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        {cutShortName(payload.value)}
      </text>
    </g>
  );
}
