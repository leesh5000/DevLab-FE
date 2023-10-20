import {useState} from "react";
import client from "../lib/client.jsx";
import Timer from "./Timer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setVerified} from "../actions/UserRegisterActions.jsx";

export const EmailInputBox = () => {

  const [email, setEmail] = useState("");
  const [mailServer, setMailServer] = useState("");
  const [count, setCount] = useState(-1);
  const [verifyCode, setVerifyCode] = useState("");
  const dispatch = useDispatch();
  const userInput = useSelector(state => state.register);

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  }

  const onVerifyCodeHandler = (e) => {
    setVerifyCode(e.target.value);
  }

  const onMailServerHandler = (e) => {
    setMailServer(e.target.value);
  }

  const onVerifyEmail = async (e) => {

    e.preventDefault();

    if (email === "" || mailServer === "") {
      alert("이메일을 바르게 입력해 주세요");
      return;
    }

    await client.get("/auth/email-verifications", {
      params: {
        email: `${email}@${mailServer}`
      },
      withCredentials: true
    }).then(() => {
      setCount(300);
    });
  }

  const onConfirmEmail = async (e) => {

    e.preventDefault();

    if (email === "" || mailServer === "") {
      alert("이메일을 바르게 입력해 주세요");
      return;
    }

    if (verifyCode === "") {
      alert("인증번호를 입력해 주세요");
      return;
    }

    await client.get("/auth/email-confirms", {
      params: {
        email: `${email}@${mailServer}`,
        code: verifyCode
      },
      withCredentials: true
    }).then(() => {
      alert("인증되었습니다.");
      dispatch(setVerified(true));
      setCount(-1);
    }).catch((e) => {
      if (e.response.status === 400) {
        alert("인증번호가 일치하지 않습니다.");
      }
    });
  }

  return (
    <>
      <form className="flex mb-8">
        <label className="w-40">
          보안코드 발급 이메일
        </label>
        <div>
          <div className="flex">
            <input type="text" className="h-8 w-40 border-1 border-gray-400 p-1.5" onChange={onEmailHandler}/>
            <span className="mx-2 text-xl">@</span>
            <input type="text" list="mail-server" value={mailServer}
                   onChange={onMailServerHandler}
                   className="h-8 w-40 border-1 border-gray-400 p-1.5 mr-4"/>
            <select className="block" onChange={onMailServerHandler}>
              <option defaultValue="selected" value="">이메일 선택</option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="daum.net">daum.net</option>
              <option value="nate.com">nate.com</option>
              <option value="">직접 입력</option>
            </select>
          </div>
          <p className="text-sm text-blue-700 my-1">
            보안코드를 발급하지 않아도 회원가입이 가능하며, 추후 내정보 페이지에서 발급받을 수 있습니다.
          </p>
        </div>
      </form>
      <form className="flex">
        <label className="w-40">
          인증 번호
        </label>
        <div className="flex flex-col">
          <div className="flex">
            <input type="text" className="h-8 w-32 border-1 border-gray-400 p-1.5" onChange={onVerifyCodeHandler} disabled={userInput.isVerified}/>
            <button className="h-8 w-10 border-1 border-l-0 border-gray-400 mr-4"
                    onClick={onConfirmEmail}>
              확인
            </button>
            <button className="h-8 w-40 border-1 bg-blue-700 hover:bg-blue-800 text-white rounded-lg"
                    onClick={onVerifyEmail}>
              인증코드 받기
            </button>
          </div>
          {
            count === -1 ?
              null :
              <Timer count={count} setCount={setCount}/>
          }
        </div>
      </form>
    </>
  );
}
