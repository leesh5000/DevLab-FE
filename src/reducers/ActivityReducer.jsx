import {CHANGE_PAGE, FETCH_USER_COMMENTS, FETCH_USER_POSTS, SET_SORT} from "../actions/ActivityActions.jsx";

const initialState = {
  content: [],
  pageable: {},
  total_pages: 0,
  total_elements: 0,
  last: false,
  size: 0,
  number: 0,
  page_info: {
    page: 0,
    size: 10,
    sort: "created_at,desc"
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_POSTS:
    case FETCH_USER_COMMENTS:
      return {
        ...state,
        content: action.payload.content,
        pageable: action.payload.pageable,
        total_pages: action.payload.total_pages,
        total_elements: action.payload.total_elements,
        last: action.payload.last,
        size: action.payload.size,
        number: action.payload.number,
      }
    case SET_SORT:
      return {
        ...state,
        page_info: {
          ...state.page_info,
          sort: action.payload
        }
      }
    case CHANGE_PAGE:
      return {
        ...state,
        page_info: {
          ...state.page_info,
          page: action.payload
        }
      }
    default:
      return state;
  }
}
