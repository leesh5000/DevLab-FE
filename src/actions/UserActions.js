import client from "../lib/client.jsx";

export const LOGIN = "users/login";
export const OAUTH_LOGIN = "users/oauth_login";
export const GET_ACCESS_TOKEN = "users/get_access_token";
export const LOGOUT = "users/logout";

export const login = (body) => async (dispatch) => {

  const response = await client.post("/auth/login", body, {
    withCredentials: true
  });

  dispatch({
    type: LOGIN,
    response: response.data
  });
};

export const oauthLogin = (payload) => async (dispatch) => {

  const response = await client.post("/auth/oauth-login", payload, {
    withCredentials: true
  });

  dispatch({
    type: OAUTH_LOGIN,
    response: response.data
  });
}

export const getAccessToken = () => async (dispatch) => {

  const response = await client.post("/auth/refresh-token", {}, {
    withCredentials: true
  });
  dispatch({
    type: GET_ACCESS_TOKEN,
    response: response.data
  });
}

export const logout = () => async (dispatch) => {

    const response = await client.delete("/auth/logout", {
      withCredentials: true
    });

    dispatch({
      type: LOGOUT,
      response: response.data
    });
}