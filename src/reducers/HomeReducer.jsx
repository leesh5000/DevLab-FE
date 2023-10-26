import {FETCH_POST_PAGES, SET_PAGE, SET_SORT} from "../actions/HomeActions.jsx";

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
    size: 20,
    sort: "created_at,desc"
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POST_PAGES:
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
          sort: action.payload,
        }
      }
    case SET_PAGE:
      return {
        ...state,
        page_info: {
          ...state.page_info,
          page: action.payload,
        }
      }
    default:
      return state;
  }
}
