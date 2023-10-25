import client from "../lib/client.jsx";

export const FETCH_USER_POSTS = "posts/FETCH_USER_POSTS";
export const FETCH_USER_COMMENTS = "FETCH_USER_COMMENTS";
export const SET_SORT = "SET_SORT";
export const CHANGE_PAGE = "CHANGE_PAGE";

export const fetchUserComments = (memberId, pageInfo) => async (dispatch) => {

  const response = await client.get(`/members/${memberId}/comments`, {
    params: {
      page: pageInfo.page,
      size: pageInfo.size,
      sort: pageInfo.sort,
    }
  });

  dispatch({
    type: FETCH_USER_COMMENTS,
    payload: response.data
  });
}

export const fetchUserPosts = (memberId, pageInfo) => async (dispatch) => {

  const response = await client.get(`/members/${memberId}/posts`, {
    params: {
      page: pageInfo.page,
      size: pageInfo.size,
      sort: pageInfo.sort,
    }
  });

  dispatch({
    type: FETCH_USER_POSTS,
    payload: response.data,
    pageInfo: pageInfo
  });
}

export const setSort = (sort) => async (dispatch) => {
  dispatch({
    type: SET_SORT,
    payload: sort,
  });
}

export const changePage = (page) => async (dispatch) => {
  dispatch({
    type: CHANGE_PAGE,
    payload: page,
  });
}