import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import allReducer from "./index";

const store = createStore(
  allReducer,
  applyMiddleware(thunk)
);

export default store;
