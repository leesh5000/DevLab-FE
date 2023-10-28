import {GET_ACCESS_TOKEN, LOGIN, LOGIN_EXPIRED, LOGOUT, OAUTH_LOGIN, REMOVE_USER} from "../actions/AuthActions.jsx";

const initialState = {
  isLogin: false,
  nickname: "",
  accessToken : "",
  accessTokenExpiredAt: 0,
  id: "",
  role: "",
}

export default function (state = initialState, action) {

  switch (action.type) {
    case LOGIN:
    case OAUTH_LOGIN:
    case GET_ACCESS_TOKEN:
      return {
        isLogin: true,
        nickname: action.payload.user_info.nickname,
        accessToken : action.payload.token_info.access_token.value,
        accessTokenExpiredAt: new Date().getTime() + (action.payload.token_info.access_token.expires_in_seconds * 1000),
        id: action.payload.user_info.id,
        role: action.payload.user_info.role,
      }
    case LOGOUT:
    case LOGIN_EXPIRED:
    case REMOVE_USER:
      return initialState;
    default:
      return state;
  }
}
