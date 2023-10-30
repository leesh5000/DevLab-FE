import {useDispatch, useSelector} from "react-redux";
import {changeLoginId, changeSecurityCode, checkSecurityCode} from "../actions/SecurityActions.jsx";

export const SecurityCheck = () => {

  const dispatch = useDispatch();
  const security = useSelector((state) => state.security);

  const checkSecurityCodeSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(checkSecurityCode(security.loginId, security.securityCode))
      .catch((e) => {
        if (e.response.status === 404) {
          alert("존재하지 않는 아이디입니다.");
        } else if (e.response.status === 403) {
          alert("일치하지 않는 보안코드입니다.");
        }
      });
  }

  const onLoginIdChangeHandler = (e) => {
    dispatch(changeLoginId(e.target.value));
  }

  const onSecurityCodeChangeHandler = (e) => {
    dispatch(changeSecurityCode(e.target.value));
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          DevLab
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            비밀번호 재설정
          </h2>
          <p className="font-light text-gray-700 dark:text-gray-400"><span className="text-red-600">아이디, 보안코드가 일치</span>해야 비밀번호를 재설정할 수 있습니다.</p>
          <form className="my-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={checkSecurityCodeSubmitHandler}>
            <div>
              <label form="login_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">로그인 아이디</label>
              <input type="login_id" name="login_id" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ID" required=""
                     onChange={onLoginIdChangeHandler}/>
            </div>
            <div>
              <label form="security_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">보안코드</label>
              <input type="security_code" name="security_code" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                     onChange={onSecurityCodeChangeHandler}/>
            </div>
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">확인</button>
          </form>
        </div>
      </div>
    </section>
  )
}