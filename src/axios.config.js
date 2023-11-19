import axios from "axios";

const { CancelToken } = axios;
const source = CancelToken.source();

let backendUrl = undefined;

if (import.meta.env.MODE === "development") {
  backendUrl = 'http://localhost:8000';
} else {
  //use .env variables
  backendUrl = import.meta.env.BACKEND_URL;
}

const dashboardInstance = axios.create({
  baseURL: backendUrl,
  timeout: 30000,
  cancelToken: source.token,
});
const res = function (response) {
  return response.data;
};
const error = function (err) {
  return Promise.reject(err);
};

dashboardInstance.interceptors.response.use(res, error);

export { dashboardInstance };
