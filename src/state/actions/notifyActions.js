/* eslint-disable */
import {
	CLEAR_NOTIFY_ALL,
	CLEAR_NOTIFICATION_DISPLAY,
	THROW_NOTIFICATION,
	LOADING_GLOBAL_ON,
	LOADING_GLOBAL_OFF
} from "./actionTypes";

export const throwNotificationDisplay = (
	message = "Something went wrong",
	severity = "error",
	state
) => {
	return {
		type: THROW_NOTIFICATION,
		payload: { severity, message, state }
	};
};
export const clearNotifyAll = () => {
	return {
		type: CLEAR_NOTIFY_ALL
	};
};
export const clearNotificationDisplay = () => {
	return {
		type: CLEAR_NOTIFICATION_DISPLAY
	};
};
export const displayGlobalLoading = () => {
	return {
		type: LOADING_GLOBAL_ON
	};
};
export const hideGlobalLoading = () => {
	return {
		type: LOADING_GLOBAL_OFF
	};
};
