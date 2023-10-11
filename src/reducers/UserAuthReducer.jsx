import {GET_ACCESS_TOKEN, LOGIN, LOGOUT, OAUTH_LOGIN, REGISTER} from "../actions/UserAuthActions.jsx";

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
        accessToken: action.payload.access_token.value,
        isLogin: true,
      }
    case LOGOUT:
      return {
        accessToken: "",
        isLogin: false,
      }
    case REGISTER:
    default:
      return state;
  }
}
