import {combineReducers} from "redux";
import userAuthReducer from "./UserAuthReducer.jsx";
import postReducer from "./PostReducer.jsx";

const rootReducer = combineReducers({
  userAuthReducer,
  postReducer,
});

export default rootReducer;
