import client from "../lib/client.jsx";

export const WRITE = "posts/WRITE";
export const EDIT = "posts/EDIT";
export const DELETE = "posts/DELETE";
export const GET_PAGE = "posts/GET_PAGE";
export const GET_DETAIL = "posts/GET_DETAIL";
export const ADD_COMMENT = "posts/ADD_COMMENT";
export const EDIT_COMMENT = "posts/EDIT_COMMENT";
export const DELETE_COMMENT = "posts/DELETE_COMMENT";
export const ADD_LIKE = "posts/ADD_LIKE";
export const ADD_LIKE_COMMENT = "posts/ADD_LIKE_COMMENT";

export const write = (data = {}, accessToken) => async (dispatch) => {

  const response = await client.post("/posts", {
    title: data.title,
    contents: data.contents,
    category: data.category,
    tags: data.tags,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  dispatch({
    type: WRITE,
    payload: response.data,
  });
}

export const edit = (id, data = {}, accessToken) => async (dispatch) => {

    const response = await client.put(`/posts/${id}`, {
      title: data.title,
      contents: data.contents,
      category: data.category,
      tags: data.tags,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    dispatch({
      type: EDIT,
      payload: response.data,
    });
}

export const deletePost = (id, accessToken) => async (dispatch) => {

  await client.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  dispatch({
    type: DELETE,
    deletedPostId: id,
  });
}

export const getPage = (category, page, size, sort) => async (dispatch) => {

    const response = await client.get(`/posts`, {
      params: {
        category: category,
        page: page,
        size: size,
        sort: sort,
      }
    });

    dispatch({
      type: GET_PAGE,
      payload: response.data,
    });
}

export const getDetail = (id) => async (dispatch) => {

    const response = await client.get(`/posts/${id}`);

    dispatch({
      type: GET_DETAIL,
      payload: response.data,
    });
}

export const addComment = (id, newComment, userAuth) => async (dispatch) => {

  const response = await client.post(`/posts/${id}/comments`, {
    contents: newComment.contents,
  }, {
    headers: {
      Authorization: `Bearer ${userAuth.accessToken}`,
    }
  });

  dispatch({
    type: ADD_COMMENT,
    newComment : {
      ...newComment,
      id: response.data.id,
    }
  });
};

export const editComment = (postId, commentId, contents, userAuth) => async (dispatch) => {

    const response = await client.put(`/posts/${postId}/comments/${commentId}`, {
      contents: contents,
    }, {
      headers: {
        Authorization: `Bearer ${userAuth.accessToken}`,
      }
    });

    dispatch({
      type: EDIT_COMMENT,
      commentId: commentId,
      contents: contents,
    });
}

export const deleteComment = (postId, commentId, userAuth) => async (dispatch) => {

    await client.delete(`/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${userAuth.accessToken}`,
      }
    });

    dispatch({
      type: DELETE_COMMENT,
      commentId: commentId,
    });
}

export const addLike = (id, userAuth) => async (dispatch) => {

  const response = await client.post(`/posts/${id}/likes`, {}, {
    headers: {
      Authorization: `Bearer ${userAuth.accessToken}`,
    }
  }).then(() => {
    alert("추천되었습니다.");
  }).catch((e) => {
    if (e.response.status === 409) {
      alert("이미 추천한 게시글입니다.");
      throw e;
    }
  });

  dispatch({
    type: ADD_LIKE,
  });
}

export const addLikeComment = (commentId, userAuth) => async (dispatch) => {

  await client.post(`/comments/${commentId}/likes`, {}, {
    headers: {
      Authorization: `Bearer ${userAuth.accessToken}`,
    }
  }).then(() => {
    alert("추천되었습니다.");
  }).catch((e) => {
    if (e.response.status === 409) {
      alert("이미 추천한 댓글입니다.");
      throw e;
    }
  });

  dispatch({
    type: ADD_LIKE_COMMENT,
    commentId: commentId,
  });
}
