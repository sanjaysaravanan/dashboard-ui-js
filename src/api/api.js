/* eslint-disable import/prefer-default-export */
import { dashboardInstance } from '../axios.config';

export const getReports = () => dashboardInstance.get('/reports');

export const postReport = (payload, config) => dashboardInstance.post('/reports', payload, config);

export const deleteReport = (id) => dashboardInstance.delete(`/reports/${id}`);

// Charts
export const getCharts = () => dashboardInstance.get('/charts');

export const postLineChart = (payload) => dashboardInstance.post('/charts/line', payload);

export const getLineChartData = (payload) => dashboardInstance.post('/charts/line/data', payload);

export const postPieChart = (payload) => dashboardInstance.post('/charts/pie', payload);

export const getPieChartData = (payload) => dashboardInstance.post('/charts/pie/data', payload);

export const postBarChart = (payload) => dashboardInstance.post('/charts/bar', payload);

export const getBarChartData = (payload) => dashboardInstance.post('/charts/bar/data', payload);

export const getChartData = (chartId) => dashboardInstance.get(`/charts/data/${chartId}`);

export const deleteChart = (chartId) => dashboardInstance.delete(`/charts/${chartId}`);

// Dashboard
export const getDashboard = () => dashboardInstance.get('/dashboard');

export const saveDashboard = (payload) => dashboardInstance.post('/dashboard', payload);
