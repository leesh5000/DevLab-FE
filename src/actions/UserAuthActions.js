import client from "../lib/client.jsx";

export const LOGIN = "login";
export const OAUTH_LOGIN = "oauth_login";
export const GET_ACCESS_TOKEN = "get_access_token";

export const login = (body) => async (dispatch) => {

  const response = await client.post("/auth/login", body, {
    withCredentials: true
  })
    .then((response) => {
      console.log(response.headers);
      return response;
    });
  dispatch({
    type: LOGIN,
    response: response.data
  });
};

export const oauthLogin = (payload) => async (dispatch) => {

  const response = await client.post("/auth/oauth-login", payload);
  dispatch({
    type: OAUTH_LOGIN,
    response: response.data
  });
}

export const getAccessToken = () => async (dispatch) => {

  const response = await client.post("/auth/refresh-token", {
    refreshToken: "hello",
  }, {
    // withCredentials: true
  });
  dispatch({
    type: GET_ACCESS_TOKEN,
    response: response.data
  });
}