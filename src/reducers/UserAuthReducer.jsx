import {GET_ACCESS_TOKEN, LOGIN, OAUTH_LOGIN} from "../actions/UserAuthActions.js";

export default function (state = {}, action) {

  switch (action.type) {
    case LOGIN:
    case OAUTH_LOGIN:
    case GET_ACCESS_TOKEN:
      return {
        accessToken: action.response.access_token.value,
        isLogin: true,
      }
    default:
      return state;
  }
}
