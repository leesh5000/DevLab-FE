import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {changePassword, changePasswordConfirm, resetPassword} from "../actions/SecurityActions.jsx";
import validator from "../utils/validator.js";
import {Logo} from "./Logo.jsx";

export const PasswordChange = () => {

  const security = useSelector((state) => state.security);
  const dispatch = useDispatch();

  const onPasswordChangeHandler = (e) => {
    dispatch(changePassword(e.target.value));
  }

  const onPasswordConfirmChangeHandler = (e) => {
    dispatch(changePasswordConfirm(e.target.value));
  }

  const onChangePasswordSubmitHandler = (e) => {
    e.preventDefault();

    if (!validator.password.test(security.password)) {
      alert("비밀번호는 6자리 이상 30자리 이하만 가능합니다.");
      return;
    }

    if (security.password !== security.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    dispatch(resetPassword(security.loginId, security.securityCode, security.password))
      .then(() => {
        alert("비밀번호가 변경되었습니다.\n변경된 비밀번호로 로그인해주세요.");
        window.location.href = "/";
      })
      .catch(() => {
        alert("비밀번호 변경이 실패하였습니다. 잠시 후 다시 시도해주세요.");
      });
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo/>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            비밀번호 변경
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={onChangePasswordSubmitHandler}>
            <div>
              <label form="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">새 비밀번호</label>
              <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                     onChange={onPasswordChangeHandler}/>
            </div>
            <div>
              <label form="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">새 비밀번호 확인</label>
              <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                     onChange={onPasswordConfirmChangeHandler}/>
              {
                security.passwordConfirm !== "" && (security.password !== security.passwordConfirm) &&
                <p id="standard_error_help" className="mt-2 text-sm text-red-600 dark:text-red-400"><span className="font-medium">비밀번호가 일치하지 않습니다.</span></p>
              }
            </div>
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
          </form>
        </div>
      </div>
    </section>
  )
}
