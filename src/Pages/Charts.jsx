/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { Box, ButtonBase, CircularProgress } from '@mui/material';

import { ResponsiveContainer } from 'recharts';
import {
  loadReports, createChart, loadCharts, loadChart, emptyChart, removeChart,
} from '../state/actions';
import CustomCard from '../Components/CustomCard';
import ChartStepper from '../Components/ChartStepper';
import LineChart from '../Components/Charts/CustomLineChart';
import PieChart from '../Components/Charts/CustomPieChart';
import BarChart from '../Components/Charts/CustomBarChart';

export default function Charts() {
  const dispatch = useDispatch();

  const chartsData = useSelector(({ charts }) => charts.charts);
  const { isLoading = false, selectedChart = null } = useSelector(({ charts }) => charts);
  const [open, setOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [chartData, setChartData] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (payload, type) => {
    dispatch(createChart(payload, type));
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(removeChart(id));
  };

  const handleViewChart = (chartObj) => {
    setChartOpen(true);
    setChartData(chartObj);
    dispatch(loadChart(chartObj));
  };

  const handleCloseChart = () => {
    setChartOpen(false);
    dispatch(emptyChart());
  };

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
    dispatch(loadReports());
    dispatch(loadCharts());
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        {chartsData.map((cardObj) => (
          <Grid item key={cardObj.name} xs={12} sm={6} md={4}>
            <CustomCard
              type="chart"
              cardName={cardObj.name}
              cardDesc={cardObj.desc}
              handleDelete={() => handleDelete(cardObj.id)}
              handleViewChart={handleViewChart}
              imgType={cardObj.type}
              cardData={cardObj}
            />
          </Grid>
        ))}
        <Grid item key="add-card" xs={12} sm={6} md={4}>
          <CustomCard action="add" type="chart" handleClickOpen={handleClickOpen} />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">
          New Chart
        </DialogTitle>
        <DialogContent>
          <ChartStepper
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={chartOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box display="flex" justifyContent="space-between">
            {chartData?.name}
            <ButtonBase onClick={handleCloseChart}>
              <CloseIcon />
            </ButtonBase>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minWidth="500px"
            m={2}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Box width="100%" height="300px">
                {selectedChart
                && (
                  <ResponsiveContainer width="100%" height="100%">
                    {renderChart(selectedChart.type)}
                  </ResponsiveContainer>
                )}
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
