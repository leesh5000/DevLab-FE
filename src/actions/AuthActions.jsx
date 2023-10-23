import client from "../lib/client.jsx";

export const LOGIN = "users/login";
export const OAUTH_LOGIN = "users/oauth-login";
export const GET_ACCESS_TOKEN = "users/get-access-token";
export const LOGOUT = "users/logout";
export const LOGIN_EXPIRED = "users/login-expired";

export const login = (data) => async (dispatch) => {

  const accessToken = await client.post("/auth/login", data, {
    withCredentials: true
  }).then((res) => {
    return res.data.access_token.value;
  });

  dispatch({
    type: OAUTH_LOGIN,
    accessToken: accessToken,
  });
};

export const oauthLogin = (data) => async (dispatch) => {

  const accessToken = await client.post("/auth/oauth-login", data, {
    withCredentials: true
  }).then((res) => {
    return res.data.access_token.value;
  });

  dispatch({
    type: OAUTH_LOGIN,
    accessToken: accessToken,
  });
}

export const fetchAccessToken = () => async (dispatch) => {

  const response = await client.post("/auth/refresh-token", {}, {
    withCredentials: true
  }).catch((e) => {
    if (e.response.status === 401) {
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      dispatch(loginExpired());
    }
  });

  dispatch({
    type: GET_ACCESS_TOKEN,
    accessToken: response.data.access_token.value,
    nickname: response.data.user_info.nickname,
    uniqueId: response.data.user_info.id,
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
