import {GET_ACCESS_TOKEN, LOGIN, LOGOUT, OAUTH_LOGIN} from "../actions/UserActions.js";

const initialState = {
  accessToken : "",
  isLogin: false,
}

export default function (state = initialState, action) {

  switch (action.type) {
    case LOGIN:
    case OAUTH_LOGIN:
    case GET_ACCESS_TOKEN:
      return {
        accessToken: action.response.access_token.value,
        isLogin: true,
      }
    case LOGOUT:
      return {
        accessToken: "",
        isLogin: false,
      }
    default:
      return state;
  }
}
