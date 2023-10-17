import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../actions/UserAuthActions.jsx";

const Login = () => {

  const [userInput, setUserInput] = useState({
    id: "",
    password: ""
  });

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

  const onLogin = () => {

    if (userInput.id === "") {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (userInput.password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const body = {
      login_id: userInput.id,
      password: userInput.password
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

  const onIdHandler = (e) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        id: e.target.value,
      }
    })
  }

  const onPasswordHandler = (e) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        password: e.target.value,
      }
    })
  }

  return (
    <>
      <Header/>
      <Navbar/>
      <div id="border" className="w-[500px] mx-auto my-24 border-1 border-gray-400 p-24 rounded flex flex-col justify-items-start items-center">
        <input type="text" className="w-full border-1 border-gray-400 p-2" placeholder="아이디" onChange={onIdHandler}/>
        <input type="password" className="w-full border-1 border-t-white border-gray-400 p-2" placeholder="패스워드" onChange={onPasswordHandler}/>
        <button className="mt-8 h-12 text-lg w-full bg-blue-700 hover:bg-blue-800 text-white rounded" onClick={onLogin}>
          로그인
        </button>
        <div id="divider" className="w-[420px] my-8">
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">
                또는
              </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </div>
        <div id="social" className="w-[340px] flex flex-col">
          <a href={googleUri}>
            <img src="/google.png" className="cursor-pointer mb-2" alt="google"/>
          </a>
          <a href={naverUri}>
            <img src="/naver.png" className="cursor-pointer mb-2" alt="naver"/>
          </a>
          <a href={kakaoUri}>
            <img src="/kakao.png" className="cursor-pointer" alt="kakao"/>
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
