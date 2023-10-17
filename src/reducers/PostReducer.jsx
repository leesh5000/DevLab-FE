import {ADD_COMMENT, ADD_LIKE, ADD_LIKE_COMMENT, GET_DETAIL, GET_PAGE, WRITE} from "../actions/PostActions.jsx";

export default function (state = {}, action) {

  switch (action.type) {
    case WRITE:
      return {
        postId: action.payload.id,
      }
    case GET_PAGE:
      return {
        content: action.payload.content,
        pageable: action.payload.pageable,
        total_page: action.payload.total_page,
        total_elements: action.payload.total_elements,
        last: action.payload.last,
        size: action.payload.size,
        number: action.payload.number,
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
