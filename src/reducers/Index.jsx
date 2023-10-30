import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer.jsx";
import PostReducer from "./PostReducer.jsx";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";
import UserReducer from "./UserReducer.jsx";
import HomeReducer from "./HomeReducer.jsx";
import {userPostPageReducer} from "./UserPostPageReducer.jsx";
import {userCommentPageReducer} from "./UserCommentPageReducer.jsx";
import {postCommentReducer} from "./PostCommentReducer.jsx";
import {SecurityReducer} from "./SecurityReducer.jsx";

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
  users: UserReducer,
  userPostPage: userPostPageReducer,
  userCommentPage: userCommentPageReducer,
  postComments: postCommentReducer,
  home: HomeReducer,
  security: SecurityReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
