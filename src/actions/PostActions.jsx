import client from "../lib/client.jsx";

export const WRITE = "WRITE";
export const GET_PAGE = "GET_PAGE";
export const GET_DETAIL = "GET_DETAIL";
export const  ADD_COMMENT = "ADD_COMMENT";

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

export const addComment = (id, contents, userAuth = {}) => async (dispatch) => {

    const response = await client.post(`/posts/${id}/comments`, {
      contents: contents,
    }, {
      headers: {
        Authorization: `Bearer ${userAuth.accessToken}`,
      }
    });

    dispatch({
      type: ADD_COMMENT,
      payload: response.data,
    });
}
