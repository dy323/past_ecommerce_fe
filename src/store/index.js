import AuthReducer from "./reducers/AuthReducer";
import ToastReducer from "./reducers/ToastReducer";
import DataReducer from "./reducers/DataReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  auth: AuthReducer,
  toast: ToastReducer,
  data: DataReducer
});

export default allReducers;
