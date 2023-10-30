import {ADD_LIKE_POST, FETCH_POST, REMOVE_POST} from "../actions/PostActions.jsx";

const initialState = {
  id: "",
  title: "",
  contents: "",
  category: "",
  tags: [],
  author: {
    id: "",
    nickname: "",
  },
  created_at: 0,
  modified_at: 0,
  like_count: 0,
  comment_count: 0,
  view_count: 0,
}

export default function (state = initialState, action) {

  switch (action.type) {
    case FETCH_POST:
      return {
        ...action.payload,
      }
    case REMOVE_POST:
      return initialState;
    case ADD_LIKE_POST:
      return {
        ...state,
        like_count: state.like_count + 1,
      }
    default:
      return state;
  }
}
