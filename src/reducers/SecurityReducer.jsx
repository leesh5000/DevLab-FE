import {
  CHANGE_LOGIN_ID,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_CONFIRM,
  CHANGE_SECURITY_CODE,
  CHECK_SECURITY_CODE
} from "../actions/SecurityActions.jsx";

const initialState = {
  loginId: "",
  securityCode: "",
  securityCheck: false,
  password: "",
  passwordConfirm: "",
}

export const SecurityReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOGIN_ID:
      return {
        ...state,
        loginId: action.payload,
      }
    case CHANGE_SECURITY_CODE:
      return {
        ...state,
        securityCode: action.payload,
      }
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }
    case CHECK_SECURITY_CODE:
      return {
        ...state,
        securityCheck: action.payload,
      }
    case CHANGE_PASSWORD_CONFIRM:
      return {
        ...state,
        passwordConfirm: action.payload,
      }
    default:
      return state;
  }
}
