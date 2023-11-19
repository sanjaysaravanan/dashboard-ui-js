/* eslint-disable */
import { DELETE_CHART, LOAD_CHARTS, SET_CHARTS_LOADING, SET_SELECTED_CHART } from "../actions/actionTypes";

export default function (state = {
  charts: [],
  isLoading: false,
  selectedChart: null,
}, action) {
  switch (action.type) {
    case LOAD_CHARTS:
      return {
        ...state,
        charts: action.payload,
        isLoading: false
      };
    case SET_CHARTS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_SELECTED_CHART:
      return {
        ...state,
        selectedChart: action.payload,
        isLoading: false,
      }
    case DELETE_CHART:
      return {
        ...state,
        charts: state.charts.filter(({ id }) => id !== action.payload),
      };
    default:
      return state;
  }
}
