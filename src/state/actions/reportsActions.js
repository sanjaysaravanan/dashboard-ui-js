/* eslint-disable */
import { DELETE_REPORT, LOAD_REPORTS } from "./actionTypes";
import {
  throwNotificationDisplay,
  displayGlobalLoading,
  hideGlobalLoading
} from "./notifyActions";
import { getReports, postReport, deleteReport } from "../../api/api";

export function loadReports() {
  return async function (dispatch) {
    try {
      dispatch(displayGlobalLoading());
      const reports = await getReports();
      dispatch({
        type: LOAD_REPORTS,
        payload: reports,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideGlobalLoading());
    }
  }
}

export function createReport(payload) {
  return async function (dispatch) {
    try {
      dispatch(displayGlobalLoading());
      const { reports} = await postReport(payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch({
        type: LOAD_REPORTS,
        payload: reports,
      })
      dispatch(throwNotificationDisplay("Report Created", "success"));
    } catch (error) {
      dispatch(
        throwNotificationDisplay("Something went wrong", "error")
      );
    } finally {
      dispatch(hideGlobalLoading());
    }
  };
}

export function removeReport(reportId) {
  return async function (dispatch) {
    try {
      dispatch(displayGlobalLoading());
      await deleteReport(reportId);
      dispatch({
        type: DELETE_REPORT,
        payload: reportId,
      });
    } catch (error) {
      console.log(error);
      dispatch(
        throwNotificationDisplay( error?.response?.data?.errorMsg || "Something went wrong", "error")
      );
    } finally {
      dispatch(hideGlobalLoading());
    }
  }
}
