import {combineReducers} from "redux";
import userAuthReducer from "./UserReducer.jsx";

const rootReducer = combineReducers({
  userAuthReducer,
});

export default rootReducer;
