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
        content: action.payload.content,
        pageable: action.payload.pageable,
        total_pages: action.payload.total_pages,
        total_elements: action.payload.total_elements,
        last: action.payload.last,
        size: action.payload.size,
        number: action.payload.number,
      }
    default:
      return state;
  }
}
