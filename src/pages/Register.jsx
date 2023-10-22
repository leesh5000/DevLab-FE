import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {useNavigate} from "react-router-dom";
import client from "../lib/client.jsx";
import 'flowbite';
import React, {useState} from "react";
import Timer from "../components/Timer.jsx";

const Register = () => {

  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    id: "",
    password: "",
    nickname: "",
    isVerified: false,
    isDuplicatedId: false,
    isDuplicatedNickname: false,
    isPasswordConfirmed: false,
  });
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [count, setCount] = useState(-1);

  const validator = {
    id: /^[a-z0-9]{4,20}$/, // 영어, 숫자로 된 4~20자리
    password: /^.{6,30}$/,
    nickname: /^[a-z0-9가-힣]{2,9}$/, // 한글, 영어, 숫자로 된 2~9자리
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  }

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

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  }

  const onVerifyCodeChangeHandler = (e) => {
    setVerifyCode(e.target.value);
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

    client.post("/auth/register", {
      login_id: userInput.id,
      password: userInput.password,
      nickname: userInput.nickname,
      verified: userInput.isVerified,
    }).then(() => {
      navigate("/");
    }).catch((e) => {
      if (e.response.status === 409) {
        alert("회원 가입에 실패하였습니다. 잠시 후 다시 시도해주세요.")
        navigate("/")
      }
    });
  }

  const onVerifyEmail = async (e) => {

    e.preventDefault();

    if (!validator.email.test(email)) {
      alert("이메일을 바르게 입력해 주세요");
      return;
    }

    setVerifyCode("");
    setUserInput({
      ...userInput,
      isVerified: false,
    })

    await client.get("/auth/email-verifications", {
      params: {
        email: email,
      },
      withCredentials: true
    }).then(() => {
      setCount(300);
    });
  }

  const onConfirmEmail = async (e) => {

    e.preventDefault();

    if (!validator.email.test(email)) {
      alert("이메일을 바르게 입력해 주세요");
      return;
    }

    if (verifyCode === "") {
      alert("인증번호를 입력해주세요");
      return;
    }

    await client.get("/auth/email-confirms", {
      params: {
        email: email,
        code: verifyCode
      },
      withCredentials: true
    }).then(() => {
      alert("인증되었습니다.");
      setUserInput({
        ...userInput,
        isVerified: true,
      })
      setCount(-1);
    }).catch((e) => {
      if (e.response.status === 400) {
        alert("인증번호가 일치하지 않습니다.");
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
                    닉네임 (2-10 자리의 한글/영어/숫자 조합)
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
              <form className="pt-2 space-y-4">
                <div>
                  <label htmlFor="email" className="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    보안코드 발급 이메일
                    <img src="/public/info1.svg" data-tooltip-target="tooltip-right" data-tooltip-placement="right" className="ml-0.5 w-5 h-5 text-gray-800 dark:text-white" alt="info"/>
                    <div id="tooltip-right" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                      <strong>보안코드란?</strong>
                      <p>보안코드는 아이디/패스워드 찾기에 사용되며, 이메일 인증을 통해 발급받을 수 있습니다.</p>
                      <p>보안코드를 발급받지 않아도 회원가입 가능하며, 추후 내정보 페이지에서 발급받을 수 있습니다.</p>
                      <div className="tooltip-arrow" data-popper-arrow="right"></div>
                    </div>
                  </label>
                  <div className="relative">
                    <input type="email" name="email" id="email" placeholder="name@company.com"
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required={false} onChange={onEmailChangeHandler}/>
                    <button type="button" className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={onVerifyEmail}>
                      전송
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm-verify" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    인증코드 확인
                  </label>
                  <div className="relative w-40">
                    <input type="text" name="confirm-verify" id="confirm-verify" placeholder="••••••"
                           className={"w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" + ` ${userInput.isVerified ? 'cursor-not-allowed' : ''}`}
                           disabled={userInput.isVerified} required={false} onChange={onVerifyCodeChangeHandler}/>
                    <button type="button" className={"absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" + ` ${userInput.isVerified ? 'cursor-not-allowed' : ''}`}
                            disabled={userInput.isVerified} onClick={onConfirmEmail}>
                      확인
                    </button>
                  </div>
                  {
                    count > 0 && <Timer count={count} setCount={setCount}/>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
