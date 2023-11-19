/* eslint-disable */
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	AUTH_USER_LOGGED,
	AUTH_LOADING,
	LOGOUT_SUCCESS
} from "./actionTypes";
import {
	throwNotificationDisplay,
	hideGlobalLoading,
	displayGlobalLoading
} from "./notifyActions";
import { localStorage } from "../utils";
import { authentication, users } from "../../api";
import Message from "../../utils/Message";

export const login = payload => {
	return async function (dispatch) {
		dispatch({
			type: AUTH_LOADING
		});
		try {
			dispatch(displayGlobalLoading());
			const rest = await authentication.loginUser(payload);
			localStorage.setLocalState("auth", { ...rest, email: payload["email"] });
			dispatch({
				type: LOGIN_SUCCESS,
				payload: { email: payload["email"] }
			});
			dispatch(throwNotificationDisplay(rest.message, "success"));
		} catch (error) {
			dispatch({
				type: LOGIN_FAIL,
				payload: { email: payload.email, errorMessage: { ...error?.message } }
			});
			dispatch(
				throwNotificationDisplay(
					error?.response.data.errorMsg || Message.en.invalidCredentials
				)
			);
		} finally {
			dispatch(hideGlobalLoading());
		}
	};
};

export const getUserLogged = email => async dispatch => {
	dispatch(displayGlobalLoading());
	const user = await users.getUser(email);
	dispatch({
		type: AUTH_USER_LOGGED,
		payload: user
	});
	dispatch(hideGlobalLoading());
};

export const logOut = () => async dispatch => {
	dispatch(displayGlobalLoading());
	dispatch({
		type: LOGOUT_SUCCESS
	});
	localStorage.removeLocalState("auth");
	dispatch(hideGlobalLoading());
};
