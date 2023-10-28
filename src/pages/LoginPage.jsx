import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../actions/AuthActions.jsx";

const LoginPage = () => {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const baseRedirectURI = import.meta.env.VITE_BASE_REDIRECT_URI;

  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const kakaoRedirectUri = baseRedirectURI + "kakao";
  const kakaoUri = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}`

  const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
  const naverRedirectUri = baseRedirectURI + "naver";
  const naverUri = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverClientId}&redirect_uri=${naverRedirectUri}&response_type=code&state=DevLab`

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const googleRedirectUri = baseRedirectURI + "google";
  const googleUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=openid email`

  const onIdChangeHandler = (e) => {
    setId(e.target.value);
  }

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  }

  const onLoginHandler = (e) => {

    e.preventDefault();

    const body = {
      login_id: id,
      password: password
    };

    dispatch(login(body))
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 404) {
          alert("존재하지 않는 아이디입니다.");
        } else if (e.response.status === 403) {
          alert("비밀번호가 일치하지 않습니다.");
        } else if (e.response.status >= 500) {
          alert("일시적인 서버 오류입니다. 잠시 후 다시 시도해주세요.");
        }
      });
  };

  return (
    <>
      <Header/>
      <Navbar/>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                 alt="logo"/>
            DevLab
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={onLoginHandler} action="#">
                <div className="relative z-0">
                  <input type="text" id="floating_id" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                         placeholder=" " required={true} onChange={onIdChangeHandler}/>
                  <label htmlFor="floating_id" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    로그인 아이디
                  </label>
                </div>
                <div>
                  <div className="relative z-0">
                    <input type="password" id="floating_password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required={true} onChange={onPasswordHandler}/>
                    <label htmlFor="floating_password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      비밀번호
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox"
                             className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                             required=""/>
                    </div>
                    <div className="ml-3 text-sm">
                      <label form="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Forgot password?
                  </a>
                </div>
                <button type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?<a href="/src/pages/RegisterPage" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Sign up</a>
                </p>
              </form>
            </div>
            <div id="divider" className="mx-8">
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">또는</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
            </div>
            <div id="social" className="w-[340px] flex flex-col mx-auto py-4 pb-6 space-y-2">
              <a href={googleUri}>
                <img src="/google.png" className="cursor-pointer" alt="google"/>
              </a>
              <a href={naverUri}>
                <img src="/naver.png" className="cursor-pointer" alt="naver"/>
              </a>
              <a href={kakaoUri}>
                <img src="/kakao.png" className="cursor-pointer" alt="kakao"/>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
