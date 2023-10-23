import {GET_ACCESS_TOKEN, LOGIN, LOGIN_EXPIRED, LOGOUT, OAUTH_LOGIN} from "../actions/AuthActions.jsx";

const initialState = {
  isLogin: false,
  nickname: "",
  accessToken : "",
}

export default function (state = initialState, action) {

  switch (action.type) {
    case LOGIN:
    case OAUTH_LOGIN:
      return {
        ...state,
        isLogin: true,
        accessToken: action.accessToken,
      }
    case GET_ACCESS_TOKEN:
      return {
        isLogin: true,
        accessToken: action.accessToken,
        nickname: action.nickname,
        uniqueId: action.uniqueId,
      };
    case LOGOUT:
    case LOGIN_EXPIRED:
      return initialState;
    default:
      return state;
  }
}
