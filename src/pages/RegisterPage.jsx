import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {useNavigate} from "react-router-dom";
import client from "../lib/client.jsx";
import 'flowbite';
import React, {useEffect, useState} from "react";
import {initFlowbite} from "flowbite";
import {EmailAuthenticator} from "../components/EmailAuthenticator.jsx";
import validator from "../utils/validator.js";

const RegisterPage = () => {

  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    id: "",
    password: "",
    nickname: "",
    email: "",
    isVerified: false,
    isDuplicatedId: false,
    isDuplicatedNickname: false,
    isPasswordConfirmed: false,
  });
  const [onEmailAuthenticator, setOnEmailAuthenticator] = useState(false);

  useEffect(() => {
    initFlowbite();
  }, [onEmailAuthenticator]);

  const onIdChangeHandler = (e) => {

    client.get("/auth/id-checks", {
      params: {
        id: e.target.value,
      }
    }).then(() => {
      setUserInput({
        ...userInput,
        id: e.target.value,
        isDuplicatedId: false,
      });
    }).catch((error) => {
      if (error.response.status === 409) {
        setUserInput({
          ...userInput,
          id: e.target.value,
          isDuplicatedId: true,
        });
      }
    });
  }

  const onNicknameChangeHandler = (e) => {

    client.get("/auth/nickname-checks", {
      params: {
        nickname: e.target.value,
      }
    }).then(() => {
      setUserInput({
        ...userInput,
        nickname: e.target.value,
        isDuplicatedNickname: false,
      });
    }).catch((error) => {
      if (error.response.status === 409) {
        setUserInput({
          ...userInput,
          nickname: e.target.value,
          isDuplicatedNickname: true,
        });
      }
    });
  };

  const onPasswordChangeHandler = (e) => {
    setUserInput({
      ...userInput,
      password: e.target.value,
    });
  }

  const onPasswordConfirmHandler = (e) => {
    if (userInput.password === e.target.value) {
      setUserInput({
        ...userInput,
        isPasswordConfirmed: true,
      });
    } else {
      setUserInput({
        ...userInput,
        isPasswordConfirmed: false,
      });
    }
  }

  const onRegister = (e) => {

    e.preventDefault();

    if (!validator.id.test(userInput.id) || userInput.isDuplicatedId) {
      alert("아이디를 바르게 입력해주세요.");
      return;
    }

    if (!validator.password.test(userInput.password) || !userInput.isPasswordConfirmed) {
      alert("비밀번호를 바르게 입력해주세요.");
      return;
    }

    if (!validator.nickname.test(userInput.nickname) || userInput.isDuplicatedNickname) {
      alert("닉네임을 바르게 입력해주세요.");
      return;
    }

    if (userInput.isVerified && !validator.email.test(userInput.email)) {
      alert("이메일을 바르게 입력해주세요.");
      return;
    }

    client.post("/auth/register", {
      login_id: userInput.id,
      password: userInput.password,
      nickname: userInput.nickname,
      email: {
        address: userInput.email,
        verified: userInput.isVerified,
      }
    }).then(() => {
      navigate("/");
    }).catch((e) => {
      if (e.response.status === 409) {
        alert("회원 가입에 실패하였습니다. 잠시 후 다시 시도해주세요.")
        navigate("/")
      }
    });
  }

  return (
    <div>
      <Header/>
      <Navbar/>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
              DevLab
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={onRegister}>
                <div className="relative z-0">
                  <input type="text" id="floating_id" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                         placeholder=" " required={true} onChange={onIdChangeHandler}/>
                  <label htmlFor="floating_id" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    아이디 (4-20 자리의 영어/숫자 조합)
                  </label>
                  {
                    userInput.isDuplicatedId &&
                      <p id="standard_error_help" className="mt-2 text-sm text-red-600 dark:text-red-400"><span className="font-medium">이미 존재하는 아이디입니다.</span></p>
                  }
                </div>
                <div className="relative z-0">
                  <input type="text" id="floating_nickname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                         placeholder=" " required={true} onChange={onNicknameChangeHandler}/>
                  <label htmlFor="floating_nickname" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    닉네임 (2-20 자리의 한글/영어/숫자 조합)
                  </label>
                  {
                    userInput.isDuplicatedNickname &&
                    <p id="standard_error_help" className="mt-2 text-sm text-red-600 dark:text-red-400"><span className="font-medium">이미 존재하는 닉네임입니다.</span></p>
                  }
                </div>
                <div className="relative z-0">
                  <input type="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                         placeholder=" " required={true} onChange={onPasswordChangeHandler}/>
                  <label htmlFor="floating_password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    비밀번호
                  </label>
                </div>
                <div className="relative z-0">
                  <input type="password" id="floating_password_confirm" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                         placeholder=" " required={true} onChange={onPasswordConfirmHandler}/>
                  <label htmlFor="floating_password_confirm" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    비밀번호 확인
                  </label>
                  {
                    userInput.password && !userInput.isPasswordConfirmed &&
                    <p id="standard_error_help" className="mt-2 text-sm text-red-600 dark:text-red-400"><span className="font-medium">비밀번호가 일치하지 않습니다.</span></p>
                  }
                </div>
                <div className="mt-2 text-sm font-light text-gray-500 dark:text-gray-400">
                  {
                    onEmailAuthenticator ? (
                      <a className="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:cursor-pointer" onClick={() => {setOnEmailAuthenticator(!onEmailAuthenticator)}}>
                        취소
                      </a>
                    ) : (
                      <>
                        <a data-popover-target="popover-right" data-popover-placement="right" className="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:cursor-pointer" onClick={() => {setOnEmailAuthenticator(!onEmailAuthenticator)}}>
                          보안코드 생성하기
                        </a>
                        <div data-popover="" id="popover-right" role="tooltip" className="absolute z-10 invisible inline-block w-96 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                          <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-white">보안코드란?</h3>
                          </div>
                          <div className="px-3 py-2">
                            <p>보안코드는 아이디/패스워드 찾기에 사용되며, 이메일 인증을 완료한 후 회원 가입을 통해 해당 이메일로 전송됩니다.</p>
                            <p><strong className="font-thin text-blue-700">보안코드를 발급하지 않고, 회원가입</strong> 할 수 있으며 추후 내 정보 페이지에서 발급 가능합니다.</p>
                          </div>
                          <div data-popper-arrow=""></div>
                        </div>
                      </>
                    )
                  }
                  {
                    onEmailAuthenticator && <EmailAuthenticator userInput={userInput} setUserInput={setUserInput}/>
                  }
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={true}/>
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
