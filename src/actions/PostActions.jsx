import client from "../lib/client.jsx";

export const WRITE = "WRITE";
export const GET_PAGE = "GET_PAGE";
export const GET_DETAIL = "GET_DETAIL";
export const  ADD_COMMENT = "ADD_COMMENT";
export const ADD_LIKE = "ADD_LIKE";
export const ADD_LIKE_COMMENT = "ADD_LIKE_COMMENT";

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

export const getPage = (page, size, sort) => async (dispatch) => {

    const response = await client.get(`/posts`, {
      params: {
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
    payload: response.data,
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