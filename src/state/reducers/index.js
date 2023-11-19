/* eslint-disable */
import { combineReducers } from "redux";
import authReducer from "./authReducers";
import chartsReducer from "./chartsReducer";
import notifyReducer from "./notifyReducers";
import reportsReducer from "./reportsReducer";
import userReducer from "./userReducer";
import dashboardReducer from "./dashboardReducer";
const reducers = combineReducers({
	state: (state = {}) => state,
	auth: authReducer,
	notify: notifyReducer,
	user: userReducer,
	reports: reportsReducer,
	charts: chartsReducer,
	dashboard: dashboardReducer,
});
const rootReducer = (state, action) => {
	if (action.type === "LOGOUT_SUCCESS") {
		state = undefined;
	}
	return reducers(state, action);
};
export default rootReducer;
