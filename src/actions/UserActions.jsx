import client from "../lib/client.jsx";

export const FETCH_MY_PROFILE = "FETCH_MY_PROFILE";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

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

export const updateUserProfile = (accessToken, memberId, userInput) => async (dispatch) => {
  const response = await client.patch(`/members/${memberId}`, {
    nickname: userInput.nickname,
    introduce: userInput.introduce,
    email: {
      address: userInput.email,
      verified: userInput.isVerified
    }
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  dispatch({
    type: UPDATE_USER_PROFILE,
    updateNickname: userInput.nickname,
    updateIntroduce: userInput.introduce,
  });
}
