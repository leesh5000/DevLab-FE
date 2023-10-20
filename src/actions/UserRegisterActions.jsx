import client from "../lib/client.jsx";

export const SET_ID = 'users/SET_ID';
export const SET_EMAIL = 'users/SET_EMAIL';
export const SET_NICKNAME = 'users/SET_NICKNAME';
export const SET_PASSWORD = 'users/SET_PASSWORD';
export const SET_PASSWORD_CONFIRM = 'users/SET_PASSWORD_CONFIRM';
export const SET_VERIFIED = 'users/SET_VERIFIED';

export const setId = (id) => async (dispatch) => {

  const payload = {
    id: id,
    isDuplicatedId: false,
  }

  await client.get("/auth/id-checks", {
    params: {
      id: id,
    }
  }).catch((error) => {
    if (error.response.status === 409) {
      payload.isDuplicatedId = true;
    }
  });

  dispatch({
    type: SET_ID,
    payload: payload,
  });
}

export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    payload: email,
  };
}

export const setNickname = (nickname) => async (dispatch) => {

  const payload = {
    nickname: nickname,
    isDuplicatedNickname: false,
  }

  await client.get("/auth/nickname-checks", {
    params: {
      nickname: nickname,
    }
  }).catch((error) => {
    if (error.response.status === 409) {
      payload.isDuplicatedNickname = true;
    }
  });

  dispatch({
    type: SET_NICKNAME,
    payload: payload,
  });
}

export const setPassword = (password) => {
  return {
    type: SET_PASSWORD,
    payload: password,
  };
}

export const setPasswordConfirm = (passwordConfirm) => {

  return {
    type: SET_PASSWORD_CONFIRM,
    payload: passwordConfirm,
  };
}

export const setVerified = (verified) => {
  return {
    type: SET_VERIFIED,
    payload: verified,
  }
}
