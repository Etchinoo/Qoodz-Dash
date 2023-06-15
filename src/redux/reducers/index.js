import { combineReducers } from "redux";
import home from "./Home.reducer";
import auth from './Auth.reducer'
const allReducers = combineReducers({
  home,
  auth
});

export default allReducers;
