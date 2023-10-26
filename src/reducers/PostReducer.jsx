import {
  ADD_COMMENT,
  ADD_LIKE,
  ADD_LIKE_COMMENT,
  DELETE,
  DELETE_COMMENT,
  EDIT,
  EDIT_COMMENT,
  GET_DETAIL,
  WRITE
} from "../actions/PostActions.jsx";

export default function (state = {}, action) {

  switch (action.type) {
    case WRITE:
    case EDIT:
      return {
        postId: action.payload.id,
      }
    case DELETE:
      return {
        ...state,
        content: state.content.filter((post) => post.id !== action.deletedPostId),
      }
    case GET_DETAIL:
      return {
        id: action.payload.id,
        title: action.payload.title,
        contents: action.payload.contents,
        category: action.payload.category,
        author: action.payload.author,
        comment_details: action.payload.comment_details,
        tags: action.payload.tags,
        created_at: action.payload.created_at,
        modified_at: action.payload.modified_at,
        like_count: action.payload.like_count,
      }
    case ADD_COMMENT:
      return {
        ...state,
        comment_details: [...state.comment_details, action.newComment],
      }
    case EDIT_COMMENT:
      return {
        ...state,
        comment_details: state.comment_details.map((commentDetail) => {
          if (commentDetail.id === action.commentId) {
            return {
              ...commentDetail,
              contents: action.contents,
              modified_at: new Date().getTime(),
            }
          } else {
            return commentDetail;
          }
        }),
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comment_details: state.comment_details.filter((commentDetail) => commentDetail.id !== action.commentId),
      }
    case ADD_LIKE:
      return {
        ...state,
        like_count: state.like_count + 1,
      }
    case ADD_LIKE_COMMENT:
      return {
        ...state,
        comment_details: state.comment_details.map((commentDetail) => {
          if (commentDetail.id === action.commentId) {
            return {
              ...commentDetail,
              like_count: commentDetail.like_count + 1,
            }
          } else {
            return commentDetail;
          }
        }),
      };
    default:
      return state;
  }
}
