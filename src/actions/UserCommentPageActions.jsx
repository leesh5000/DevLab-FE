import client from "../lib/client.jsx";

export const FETCH_USER_COMMENT_PAGE = "FETCH_USER_COMMENT_PAGE";
export const SET_SORT = "user_comment_pages/SET_SORT";
export const SET_PAGE = "user_comment_pages/SET_PAGE";

export const fetchUserCommentPages = (memberId, pageInfo) => async (dispatch) => {

    const response = await client.get(`/members/${memberId}/comments`, {
      params: {
        page: pageInfo.page,
        size: pageInfo.size,
        sort: pageInfo.sort,
      }
    });

    dispatch({
      type: FETCH_USER_COMMENT_PAGE,
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
