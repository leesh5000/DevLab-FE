import client from "../lib/client.jsx";

export const FETCH_MY_PROFILE = "FETCH_MY_PROFILE";

export const fetchMyProfile = (accessToken) => async (dispatch) => {
  const response = await client.get("/members/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  dispatch({
    type: FETCH_MY_PROFILE,
    payload: response.data
  });
}
