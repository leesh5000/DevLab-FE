import {combineReducers} from "redux";
import userAuthReducer from "./UserAuthReducer.jsx";
import postReducer from "./PostReducer.jsx";
import userRegisterReducer from "./UserRegisterReducer.jsx";

const rootReducer = combineReducers({
  postReducer,
  userAuthReducer,
  userRegisterReducer,
});

export default rootReducer;
