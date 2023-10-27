import client from "../lib/client.jsx";

export const FETCH_POST_COMMENTS = "postComments/FETCH_POST_COMMENTS";
export const EDIT_POST_COMMENT = "postComments/EDIT_POST_COMMENT";
export const DELETE_POST_COMMENT = "postComments/DELETE_POST_COMMENT";
export const ADD_LIKE = "postComments/ADD_LIKE";

export const fetchPostComments = (postId, pageInfo) => async (dispatch) => {

  const response = await client.get(`/posts/${postId}/comments`, {
    params: pageInfo,
  }).then((res) => {
    return res.data;
  });

  dispatch({
    type: FETCH_POST_COMMENTS,
    payload: response,
  });

}

export const editPostComment = (postId, commentId, contents, accessToken) => async (dispatch) => {

  const response = await client.put(`/posts/${postId}/comments/${commentId}`, {
    contents: contents,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  dispatch({
    type: EDIT_POST_COMMENT,
    payload: {
      editCommentId: commentId,
      editContents: contents,
    }
  });

}

export const deletePostComment = (commentId, accessToken) => async (dispatch) => {

    const response = await client.delete(`/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    dispatch({
      type: DELETE_POST_COMMENT,
      payload: {
        deleteCommentId: commentId,
      }
    });
}

export const addLike = (commentId, accessToken) => async (dispatch) => {

  const response = await client.post(`/comments/${commentId}/likes`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  dispatch({
    type: ADD_LIKE,
    payload: {
      likeCommentId: commentId
    }
  });
}
