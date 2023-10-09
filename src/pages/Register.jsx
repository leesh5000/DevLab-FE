import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import IdInputBox from "../components/IdInputBox.jsx";
import {useState} from "react";
import PasswordInputBox from "../components/PasswordInputBox.jsx";
import NicknameInputBox from "../components/NicknameInputBox.jsx";
import {EmailInputBox} from "../components/EmailInputBox.jsx";
import {CertInputBox} from "../components/CertInputBox.jsx";
import client from "../lib/client.jsx";
import {useNavigate} from "react-router-dom";

const Register = () => {

  const [id, setId] = useState("");
  const [isValidId, setIsValidId] = useState(false);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isValidNickname, setIsValidNickname] = useState(false);
  const navigate = useNavigate();

  const onRegister = () => {

    if (!isValidId) {
      alert("아이디를 확인해주세요.");
      setIsValidId(false);
      return;
    }

    if (!isValidPassword) {
      alert("비밀번호를 확인해주세요.");
      setIsValidPassword(false);
      return;
    }

    if (!isValidNickname) {
      alert("닉네임을 확인해주세요.");
      setIsValidNickname(false);
      return;
    }

    const callRegisterApi = async (id, password, nickname) => {
      try {
        const response = await client.post("/auth/register", {
          login_id: id,
          password: password,
          nickname: nickname
        });
      } catch (e) {
        alert("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
        console.log(e);
      }
    }

    callRegisterApi(id, password, nickname).then(() => {
      navigate("/");
    });
  }

  const onCancel = () => {
    navigate(-1);
  }

  return (
    <div>
      <Header/>
      <Navbar/>
      <div id="body" className="h-[1024px] flex flex-col justify-center items-center">
        <div id="input" className="border-2 border-gray-300 p-24 rounded">
          <IdInputBox id={id} setId={setId}
                      isValid={isValidId} setIsValid={setIsValidId}/>
          <PasswordInputBox password={password} setPassword={setPassword}
                            isValid={isValidPassword} setIsValid={setIsValidPassword}/>
          <NicknameInputBox nickname={nickname} setNickname={setNickname}
                            isValid={isValidNickname} setIsValid={setIsValidNickname}/>
          <EmailInputBox/>
          <CertInputBox/>
        </div>
        <div className="h-20 w-4/5 flex justify-end items-center">
          <button className="ml-6 border-1 p-1 px-3 border-gray-600"
                  onClick={onRegister}>
            등록
          </button>
          <button className="ml-6 border-1 p-1 px-3 border-gray-600"
                  onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;