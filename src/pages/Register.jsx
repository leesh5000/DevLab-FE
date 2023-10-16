import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import client from "../lib/client.jsx";
import {EmailInputBox} from "../components/EmailInputBox.jsx";
import NicknameInputBox from "../components/NicknameInputBox.jsx";
import PasswordInputBox from "../components/PasswordInputBox.jsx";
import IdInputBox from "../components/IdInputBox.jsx";
import 'flowbite';

const Register = () => {

  const navigate = useNavigate();
  const userInput = useSelector(state => state.userRegisterReducer);

  console.log("userInput = ", userInput);

  const validator = {
    id: /^[a-z0-9]{4,20}$/, // 영어, 숫자로 된 4~20자리
    password: /^.{6,30}$/,
    nickname: /^[a-z0-9가-힣]{2,9}$/, // 한글, 영어, 숫자로 된 2~9자리
  }

  const onRegister = async () => {

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

    await client.post("/auth/register", {
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

  const onCancel = () => {
    navigate(-1);
  }

  const onInfoHandler = () => {

  }

  return (
    <div>
      <Header/>
      <Navbar/>
      <div className="font-semibold border-b-2 border-blue-700 pb-1 mt-12 mb-4">
        회원가입
      </div>
      <div className="border-1 border-gray-400 rounded p-12">
        <IdInputBox/>
        <PasswordInputBox/>
        <NicknameInputBox/>
      </div>
      <div className="flex items-center border-b-2 border-blue-700 pb-1 mt-8 mb-4">
        <div className="font-semibold mr-0.5">
          보안코드 발급받기
        </div>
        <button data-tooltip-target="tooltip-default" data-tooltip-placement="right" type="button">
          <img src="/public/info1.svg" className="h-5" alt=""/>
        </button>
        <div id="tooltip-default" role="tooltip"
             className="absolute z-10 invisible inline-block px-3 py-2 text-sm text-white transition-opacity duration-300 bg-gray-800 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          <p className="pb-3">보안코드란?</p>
          <p className="pb-1">보안코드는 아이디/비밀번호 찾기에 사용됩니다.</p>
          <p className="pb-1">보안코드는 이메일 인증 완료 후 해당 이메일을 통해 발급받을 수 있습니다.</p>
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
      <div className="border-1 border-gray-400 rounded p-12">
        <EmailInputBox/>
      </div>
      <div className="flex justify-end mb-8 mt-6">
        <button className="mr-6 border-1 border-gray-400 rounded p-2 px-6" onClick={onRegister}>
          등록
        </button>
        <button className="border-1 border-gray-400 rounded p-2 px-6" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default Register;
