import {GET_ACCESS_TOKEN, LOGIN, LOGOUT, OAUTH_LOGIN} from "../actions/UserAuthActions.jsx";

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
      };
    case LOGOUT:
      return initialState;
    default:
      return {
        ...state,
      }
  }
}
