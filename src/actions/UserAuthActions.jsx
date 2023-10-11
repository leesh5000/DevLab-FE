import client from "../lib/client.jsx";

export const REGISTER = "users/register";
export const LOGIN = "users/login";
export const OAUTH_LOGIN = "users/oauth-login";
export const GET_ACCESS_TOKEN = "users/get-access-token";
export const LOGOUT = "users/logout";

export const register = (data) => async (dispatch) => {

    const response = await client.post("/auth/register", data);

    dispatch({
      type: REGISTER,
      payload: response.data
    });
}

export const login = (data) => async (dispatch) => {

  const response = await client.post("/auth/login", data, {
    withCredentials: true
  });

  dispatch({
    type: LOGIN,
    payload: response.data
  });
};

export const oauthLogin = (data) => async (dispatch) => {

  const response = await client.post("/auth/oauth-login", data, {
    withCredentials: true
  });

  dispatch({
    type: OAUTH_LOGIN,
    payload: response.data
  });
}

export const fetchAccessToken = () => async (dispatch) => {

  const response = await client.post("/auth/refresh-token", {}, {
    withCredentials: true
  });
  dispatch({
    type: GET_ACCESS_TOKEN,
    payload: response.data
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
