import { dashboardInstance } from "../axios.config";

import allData from "./mock-response/all-charts-data.json";
import allCharts from "./mock-response/all-charts.json";
import allReports from "./mock-response/all-reports.json";
import dashboardData from "./mock-response/dashboard.json";

const mockPromise = (data) =>
  new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, 1500);
  });

const mockPromiseId = (data, payload) =>
  new Promise((res) => {
    setTimeout(() => {
      res(data[payload["id"]]);
    }, 1500);
  });

//export const getReports = () => dashboardInstance.get('/reports');
export const getReports = () => mockPromise(allReports);

export const postReport = (payload, config) =>
  dashboardInstance.post("/reports", payload, config);

export const deleteReport = (id) => dashboardInstance.delete(`/reports/${id}`);

// Charts
//export const getCharts = () => dashboardInstance.get('/charts');
export const getCharts = () => mockPromise(allCharts);

export const postLineChart = (payload) =>
  dashboardInstance.post("/charts/line", payload);

//export const getLineChartData = (payload) => dashboardInstance.post('/charts/line/data', payload);
export const getLineChartData = (payload) => mockPromiseId(allData, payload);

export const postPieChart = (payload) =>
  dashboardInstance.post("/charts/pie", payload);

//export const getPieChartData = (payload) => dashboardInstance.post('/charts/pie/data', payload);
export const getPieChartData = (payload) => mockPromiseId(allData, payload);

export const postBarChart = (payload) =>
  dashboardInstance.post("/charts/bar", payload);

//export const getBarChartData = (payload) => dashboardInstance.post('/charts/bar/data', payload);
export const getBarChartData = (payload) => mockPromiseId(allData, payload);

// export const getChartData = (chartId) => dashboardInstance.get(`/charts/data/${chartId}`);

export const getChartData = (chartId) =>
  mockPromiseId(allData, { id: chartId });

export const deleteChart = (chartId) =>
  dashboardInstance.delete(`/charts/${chartId}`);

// Dashboard
//export const getDashboard = () => dashboardInstance.get("/dashboard");

export const getDashboard = () => {
  if (localStorage.getItem("layouts")) {
    return mockPromise({
      id: "dashboard",
      items: JSON.parse(localStorage.getItem("items")),
      layouts: JSON.parse(localStorage.getItem("layouts")),
      layout: JSON.parse(localStorage.getItem("layout")),
    });
  }
  return mockPromise(dashboardData);
};

/* export const saveDashboard = (payload) =>
  dashboardInstance.post("/dashboard", payload); */

export const saveDashboard = (payload) =>
  mockPromise({ message: "Dash Saved Successfully", updated_date: payload });
