/* eslint-disable */
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	AUTH_LOADING,
	AUTH_USER_LOGGED,
	LOGOUT_SUCCESS
} from "../actions/actionTypes";
import { localStorage } from "../utils";

const local = localStorage.getLocalState("auth");
const initialState = {
	...local,
	isAuthenticated: !!local?.email,
	isLoggedOut: false,
	isLoading: false,
	user: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case AUTH_LOADING:
			return {
				...state,
				isLoading: true
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false
			};
		case AUTH_USER_LOGGED:
			return {
				...state,
				user: action.payload
			};
		case LOGIN_FAIL:
			return {
				isAuthenticated: false,
				isLoading: false,
				user: null
			};
		case LOGOUT_SUCCESS:
			return {
				isLoggedOut: true,
				isAuthenticated: false,
				isLoading: false
			};
		default:
			return state;
	}
}
