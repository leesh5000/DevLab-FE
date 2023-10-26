import client from "../lib/client.jsx";

export const FETCH_POST_PAGES = "posts/FETCH_POST_PAGES";
export const SET_SORT = "posts/SET_SORT";
export const SET_PAGE = "posts/SET_PAGE";

export const fetchPostPages = (category, {page, size, sort}, keyword) => async (dispatch) => {

  const response = await client.get(`/posts`, {
    params: {
      category: category,
      page: page,
      size: size,
      sort: sort,
      keyword,
    }
  });

  dispatch({
    type: FETCH_POST_PAGES,
    payload: response.data,
  });
}

export const setSort = (sort) => {
  return {
    type: SET_SORT,
    payload: sort,
  }
}

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page,
  }
}
