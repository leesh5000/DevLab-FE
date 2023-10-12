export default function (state = {}, action) {

  switch (action.type) {
    case "WRITE":
      return {
        postId: action.payload.id,
      }
    default:
      return state;
  }
}
