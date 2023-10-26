import React, {useEffect, useState} from "react";
import client from "../lib/client.jsx";
import Timer from "./Timer.jsx";
import {initFlowbite} from "flowbite";

export const EmailAuthenticator = ({userInput, setUserInput}) => {

  const [verifyCode, setVerifyCode] = useState("");
  const [count, setCount] = useState(-1);

  const validator = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  }

  useEffect(() => {
    initFlowbite();
  }, []);

  const onEmailChangeHandler = (e) => {
    setUserInput({
      ...userInput,
      email: e.target.value,
    })
  }

  const onVerifyCodeChangeHandler = (e) => {
    setVerifyCode(e.target.value);
  }

  const onVerifyEmail = async (e) => {

    e.preventDefault();

    if (!validator.email.test(userInput.email)) {
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
        email: userInput.email,
      },
      withCredentials: true
    }).then(() => {
      setCount(300);
    });
  }

  const onConfirmEmail = async (e) => {

    e.preventDefault();

    if (!validator.email.test(userInput.email)) {
      alert("이메일을 바르게 입력해 주세요");
      return;
    }

    if (verifyCode === "") {
      alert("인증번호를 입력해주세요");
      return;
    }

    if (count === -1) {
      alert("인증번호를 먼저 이메일로 전송해주세요");
      return;
    }

    await client.get("/auth/email-confirms", {
      params: {
        email: userInput.email,
        code: verifyCode
      },
      withCredentials: true
    }).then(() => {
      alert("이메일 인증이 완료 되었습니다.\n작업 완료 후 해당 이메일로 보안코드가 전송됩니다.");
      setUserInput({
        ...userInput,
        email: userInput.email,
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
    <div className="mt-2 space-y-2">
      <div className="relative">
        <input type="email" name="email" id="email" placeholder="name@company.com"
               className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" + ` ${userInput.isVerified ? 'cursor-not-allowed' : ''}`}
               required={false} onChange={onEmailChangeHandler}/>
        <button type="button" className={"absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" + ` ${userInput.isVerified ? 'cursor-not-allowed' : ''}`}
                onClick={onVerifyEmail}>
          인증번호 전송
        </button>
      </div>
      <div>
        <div className="relative w-56">
          <input type="text" name="confirm-verify" id="confirm-verify" placeholder="인증번호 입력"
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
    </div>
  )
}
