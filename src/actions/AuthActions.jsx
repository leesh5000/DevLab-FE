import client from "../lib/client.jsx";

export const LOGIN = "users/login";
export const OAUTH_LOGIN = "users/oauth-login";
export const GET_ACCESS_TOKEN = "users/get-access-token";
export const LOGOUT = "users/logout";
export const LOGIN_EXPIRED = "users/login-expired";
export const REMOVE_USER = "users/remove-user";

export const login = (data) => async (dispatch) => {

  const response = await client.post("/auth/login", data, {
    withCredentials: true
  }).then((res) => {
    return res.data;
  });

  dispatch({
    type: OAUTH_LOGIN,
    payload: response,
  });
};

export const oauthLogin = (data) => async (dispatch) => {

  const response = await client.post("/auth/oauth-login", data, {
    withCredentials: true
  }).then((res) => {
    return res.data;
  });

  dispatch({
    type: OAUTH_LOGIN,
    payload: response,
  });
}

export const fetchAccessToken = () => async (dispatch, getState) => {

  // 로그인 유저가 아니면, 액세스 토큰을 발급 받을 필요 없음
  if (!getState().auth.isLogin) {
    return;
  }

  // 액세스 토큰이 만료되지 않았으면, 액세스 토큰을 재발급 받지 않는다.
  if (getState().auth.accessTokenExpiredAt > new Date().getTime()) {
    console.log(getState().auth.accessTokenExpiredAt);
    return;
  }

  const response = await client.post("/auth/refresh-token", {}, {
    withCredentials: true
  }).then((res) => {
    return res.data;
  }).catch((e) => {
    if (e.response.status === 401 || e.response.status === 404) {
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      dispatch(loginExpired());
    }
  });

  dispatch({
    type: GET_ACCESS_TOKEN,
    payload: response,
  });
}

export const logout = () => async (dispatch) => {

    const response = await client.delete("/auth/logout", {
      withCredentials: true
    });

    dispatch({
      type: LOGOUT,
      payload: response.data
    });
}

export const loginExpired = () => {
  return {
    type: LOGIN_EXPIRED,
  }
}

export const removeUser = (accessToken, memberId) => async (dispatch) => {

  const response = await client.delete(`/members/${memberId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  dispatch({
    type: REMOVE_USER,
    payload: response.data
  });
}
