export default function (state = {}, action) {

  switch (action.type) {
    case "WRITE":
      return {
        postId: action.payload.id,
      }
    case "GET_PAGE":
      return {
        content: action.payload.content,
        pageable: action.payload.pageable,
        totalPages: action.payload.totalPages,
        totalElements: action.payload.totalElements,
        last: action.payload.last,
        size: action.payload.size,
        number: action.payload.number,
      }
    case "GET_DETAIL":
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
    default:
      return state;
  }
}