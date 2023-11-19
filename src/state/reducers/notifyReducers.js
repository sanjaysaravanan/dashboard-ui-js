/* eslint-disable */
import {
	THROW_NOTIFICATION,
	CLEAR_NOTIFY_ALL,
	CLEAR_NOTIFICATION_DISPLAY,
	LOADING_GLOBAL_OFF,
	LOADING_GLOBAL_ON
} from "../actions/actionTypes";
const initialState = {
	isLoading: [],
	notification: {
		message: "",
		isOpen: false
	}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case THROW_NOTIFICATION:
			return {
				...state,
				notification: {
					state: action.payload.state,
					severity: action.payload.severity,
					message: action.payload.message,
					isOpen: true
				}
			};
		case CLEAR_NOTIFICATION_DISPLAY:
			return {
				...state,
				notification: initialState.notification
			};
		case CLEAR_NOTIFY_ALL:
			return initialState;
		case LOADING_GLOBAL_ON:
			return {
				...state,
				isLoading: [...state.isLoading, true]
			};
		case LOADING_GLOBAL_OFF:
			return {
				...state,
				isLoading: state.isLoading.slice(1)
			};
		default:
			return state;
	}
}
