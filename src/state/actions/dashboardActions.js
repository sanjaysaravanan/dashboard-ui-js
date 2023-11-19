/* eslint-disable no-console */
/* eslint-disable func-names */
import { LOAD_LAYOUT } from './actionTypes';

import { getDashboard, saveDashboard } from '../../api/api';

import {
  displayGlobalLoading,
  hideGlobalLoading,
} from './notifyActions';

export function loadLayout() {
  return async function (dispatch) {
    try {
      dispatch(displayGlobalLoading());
      const layout = await getDashboard();
      dispatch({
        type: LOAD_LAYOUT,
        payload: layout,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideGlobalLoading());
    }
  };
}

export function saveLayout(payload) {
  return async function (dispatch) {
    try {
      dispatch(displayGlobalLoading());
      const { updated_data: newLayout } = await saveDashboard(payload);
      dispatch({
        type: LOAD_LAYOUT,
        payload: newLayout,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideGlobalLoading());
    }
  };
}
