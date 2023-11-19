/* eslint-disable */
import { USER_ADD_SUCCESS, USER_ERROR } from "./actionTypes";
import {
	throwNotificationDisplay,
	displayGlobalLoading,
	hideGlobalLoading
} from "./notifyActions";
import { users } from "../../api";

export function createUser(user) {
	return async function (dispatch) {
		try {
			dispatch(displayGlobalLoading());
			const result = await users.createUser(user);
			dispatch({
				type: USER_ADD_SUCCESS,
				payload: { result }
			});
			dispatch(throwNotificationDisplay(result?.message, "success", user));
		} catch (error) {
			dispatch({ type: USER_ERROR });
			dispatch(
				throwNotificationDisplay(error?.response.data.errorMsg, "error", user)
			);
		} finally {
			dispatch(hideGlobalLoading());
		}
	};
}
