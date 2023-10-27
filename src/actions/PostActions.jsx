import client from "../lib/client.jsx";

export const CREATE_POST = "posts/CREATE_POST";
export const EDIT_POST = "posts/EDIT_POST";
export const REMOVE_POST = "posts/REMOVE_POST";
export const FETCH_POST = "posts/FETCH_POST";
export const ADD_LIKE_POST = "posts/ADD_LIKE_POST";

export const createPost = (data = {}, accessToken) => async (dispatch) => {

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
    type: CREATE_POST,
    payload: response.data,
  });
}

export const editPost = (id, data = {}, accessToken) => async (dispatch) => {

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
      type: EDIT_POST,
      payload: response.data,
    });
}

export const removePost = (id, accessToken) => async (dispatch) => {

  await client.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  dispatch({
    type: REMOVE_POST,
    deletedPostId: id,
  });
}

export const fetchPost = (id) => async (dispatch) => {

    const response = await client.get(`/posts/${id}`);

    dispatch({
      type: FETCH_POST,
      payload: response.data,
    });
}

export const addLikePost = (id, userAuth) => async (dispatch) => {

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
    type: ADD_LIKE_POST,
  });
}
