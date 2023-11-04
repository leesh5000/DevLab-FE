import client from "../lib/client.jsx";

export const FETCH_POSTS = "posts/FETCH_POSTS";
export const DELETE_POST = "posts/DELETE_POST"

export const fetchPosts = ({category, page, size, sort, keyword}) => async (dispatch) => {

  const response = await client.get(`/posts`, {
    params: {
      category: category,
      page: page,
      size: size,
      sort: sort,
      keyword: keyword,
    }
  });

  dispatch({
    type: FETCH_POSTS,
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
    type: DELETE_POST,
    deletedPostId: id,
  });
}
