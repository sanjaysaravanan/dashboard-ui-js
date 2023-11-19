/* eslint-disable */
import { USER_ADD_SUCCESS, USER_ERROR } from "../actions/actionTypes";

export default function userReducer(state = {}, action) {
	switch (action.type) {
		case USER_ADD_SUCCESS:
			return {
				...state,
				isLoading: false
			};
		case USER_ERROR:
			return {
				...state,
				error: action.payload,
				isLoading: false
			};
		default:
			return state;
	}
}
