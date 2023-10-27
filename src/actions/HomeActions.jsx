import client from "../lib/client.jsx";

export const FETCH_POSTS = "posts/FETCH_POSTS";

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
