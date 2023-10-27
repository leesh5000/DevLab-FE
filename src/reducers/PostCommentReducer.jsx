import {
  ADD_LIKE,
  CREATE_POST_COMMENT,
  DELETE_POST_COMMENT,
  EDIT_POST_COMMENT,
  FETCH_POST_COMMENTS
} from "../actions/PostCommentActions.jsx";

const initialState = {
  content: [],
  total_elements: 0,
  total_pages: 0,
}

export const postCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_COMMENTS:
      return {
        content: action.payload.content,
        total_elements: action.payload.total_elements,
        total_pages: action.payload.total_pages,
      }
    case CREATE_POST_COMMENT:
      return {
        ...state
      }
    case EDIT_POST_COMMENT:
      return {
        ...state,
        content: state.content.map((comment) => {
          console.log(comment.id, action.payload.editCommentId);
          if (comment.id === action.payload.editCommentId) {
            return {
              ...comment,
              contents: action.payload.editContents,
              modified_at: new Date().getTime(),
            }
          }
          return comment;
        })
      }
    case DELETE_POST_COMMENT:
      return {
        ...state,
        content: state.content.filter((comment) => comment.id !== action.payload.deleteCommentId),
      }
    case ADD_LIKE:
      return {
        ...state,
        content: state.content.map((comment) => {
          if (comment.id === action.payload.likeCommentId) {
            return {
              ...comment,
              like_count: comment.like_count + 1,
            }
          }
          return comment;
        })
      }
    default:
      return state;
  }
}
