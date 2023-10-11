import {combineReducers} from "redux";
import userAuthReducer from "./UserAuthReducer.jsx";

const rootReducer = combineReducers({
  userAuthReducer,
});

export default rootReducer;
