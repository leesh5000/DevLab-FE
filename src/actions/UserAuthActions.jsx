import client from "../lib/client.jsx";

export const LOGIN = "users/login";
export const OAUTH_LOGIN = "users/oauth-login";
export const GET_ACCESS_TOKEN = "users/get-access-token";
export const LOGOUT = "users/logout";

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
  }).then((res) => {
    return {
      accessToken: res.data.access_token.value,
      nickname: res.data.user_info.nickname,
    }
  });

  dispatch({
    type: GET_ACCESS_TOKEN,
    accessToken: response.accessToken,
    nickname: response.nickname,
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
