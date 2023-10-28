import {FETCH_POSTS} from "../actions/HomeActions.jsx";

const initialState = {
  content: [],
  pageable: {},
  total_pages: 0,
  total_elements: 0,
  last: false,
  size: 0,
  number: 0,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...action.payload,
      }
    default:
      return state;
  }
}
