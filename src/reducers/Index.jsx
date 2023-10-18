import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer.jsx";
import PostReducer from "./PostReducer.jsx";
import RegisterReducer from "./RegisterReducer.jsx";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";

const subsetFilter = createFilter('auth', ['isLogin']);

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"],
  transforms: [subsetFilter],
}

const rootReducer = combineReducers({
  posts: PostReducer,
  auth: AuthReducer,
  register: RegisterReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
