import client from "../lib/client.jsx";

export const CHANGE_LOGIN_ID = 'CHANGE_LOGIN_ID';
export const CHANGE_SECURITY_CODE = 'CHANGE_SECURITY_CODE';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_CONFIRM = 'CHANGE_PASSWORD_CONFIRM';
export const CHECK_SECURITY_CODE  = 'CHECK_SECURITY_CODE';
export const RESET_PASSWORD  = 'RESET_PASSWORD';

export const changeLoginId = (loginId) => ({
  type: CHANGE_LOGIN_ID,
  payload: loginId
});

export const changeSecurityCode = (securityCode) => ({
  type: CHANGE_SECURITY_CODE,
  payload: securityCode
});

export const changePassword = (password) => ({
  type: CHANGE_PASSWORD,
  payload: password
});

export const changePasswordConfirm = (confirmPassword) => ({
  type: CHANGE_PASSWORD_CONFIRM,
  payload: confirmPassword,
});

export const checkSecurityCode = (loginId, securityCode) => async (dispatch, getState) => {

  await client.post('/auth/security-code-checks', {
    login_id: loginId,
    security_code: securityCode,
  }).catch((e) => {
    throw e;
  });

  dispatch({
    type: CHECK_SECURITY_CODE,
    payload: true,
  });
}

export const resetPassword = (loginId, securityCode, password) => async (dispatch, getState) => {

    await client.post('/auth/change-password', {
      login_id: loginId,
      security_code: securityCode,
      password: password,
    }).catch((e) => {
      throw e;
    });

    dispatch({
      type: RESET_PASSWORD,
      payload: true,
    });
}
