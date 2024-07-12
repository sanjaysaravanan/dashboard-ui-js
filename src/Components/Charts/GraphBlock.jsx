/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import { ButtonBase, Skeleton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LineChart from './CustomLineChart';
import BarChart from './CustomBarChart';
import PieChart from './CustomPieChart';
import { getChartData } from '../../api/api';

// eslint-disable-next-line no-unused-vars
function GraphBlock({ chartId, edit, handleDeleteChart }) {
  const [isLoading, setLoading] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);

  const renderChart = (type) => {
    switch (type) {
      case 'line':
        return (
          <LineChart
            data={selectedChart.chartData}
            lines={selectedChart.lines}
            xAxis={selectedChart.xaxis}
          />
        );
      case 'pie':
        return (
          <PieChart
            data={selectedChart.chartData}
            showBy={selectedChart.showBy}
            dataField={selectedChart.dataField}
          />
        );
      case 'bar':
        return (
          <BarChart
            data={selectedChart.chartData}
            bars={selectedChart.bars}
            xAxis={selectedChart.xaxis}
            stackedBars={selectedChart.stacked}
          />
        );
      default:
        return '';
    }
  };

  useEffect(() => {
    setLoading(true);
    getChartData(chartId).then((data) => {
      setSelectedChart(data);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && <Skeleton variant="rectangular" width="100%" height="100%" />}
      {selectedChart
        ? (
          <>
            <Box display="flex" justifyContent="space-between" px={1} fontWeight="bold" mb={1}>
              {selectedChart?.name}
              {edit && (
                <ButtonBase style={{zIndex: 999999, position: 'absolute', top: 5, right: 5}} onClick={handleDeleteChart}>
                  <CloseIcon fontSize="small" />
                </ButtonBase>
              )}
            </Box>
            <Box height="calc(100% - 32px)" width="100%" px={1}>
              {renderChart(selectedChart.type)}
            </Box>
          </>
        )
        : ''}
    </>
  );
}

export default GraphBlock;
