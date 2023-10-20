import {
  SET_EMAIL,
  SET_ID,
  SET_NICKNAME,
  SET_PASSWORD,
  SET_PASSWORD_CONFIRM,
  SET_VERIFIED
} from "../actions/UserRegisterActions.jsx";

const initialState = {
  id: "",
  nickname: "",
  password: "",
  email: "",
  isDuplicatedId : false,
  isDuplicatedNickname: false,
  isPasswordConfirmed: false,
  isVerified: false,
}
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ID:
      return {
        ...state,
        id: action.payload.id,
        isDuplicatedId: action.payload.isDuplicatedId,
      };
    case SET_NICKNAME:
      return {
        ...state,
        nickname: action.payload.nickname,
        isDuplicatedNickname: action.payload.isDuplicatedNickname,
      }
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }
    case SET_PASSWORD_CONFIRM:
      return {
        ...state,
        isPasswordConfirmed: state.password === action.payload,
      }
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case SET_VERIFIED:
      return {
        ...state,
        isVerified: action.payload,
      }
    default:
      return state;
  }
};
