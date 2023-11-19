/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Grid, Paper, Typography, useTheme,
} from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import BarChartIcon from '@mui/icons-material/BarChart';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';

function CustomIcon({ type, ...props }) {
  switch (type) {
    case 'pie':
      return <DonutLargeIcon {...props} />;
    case 'bar':
      return <BarChartIcon {...props} />;
    case 'line':
      return <StackedLineChartIcon {...props} />;
    default:
      return '';
  }
}

function MiniChartCard({
  type, name, highlight, chartId, handleSelect,
}) {
  const theme = useTheme();

  return (
    <Grid item xs={3}>
      <Paper
        sx={{
          borderRadius: '4px',
          border: `2px solid ${highlight ? theme.palette.primary.main : theme.palette.common.black}`,
          color: highlight ? theme.palette.primary.main : theme.palette.common.black,
          height: '120px',
          width: '112px',
          textAlign: 'center',
          p: 1,
        }}
        component="button"
        onClick={() => handleSelect(chartId)}
      >
        <CustomIcon type={type} sx={{ fontSize: '32px' }} />
        <br />
        <Typography variant="subtitle2" fontWeight="bold">{name}</Typography>
      </Paper>
    </Grid>
  );
}

export default MiniChartCard;
