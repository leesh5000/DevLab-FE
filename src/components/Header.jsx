import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import client from "../lib/client.jsx";
import {Cookies} from "react-cookie";

const Header = () => {

  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [userAuth, setUserAuth] = useState({
    isLogin : false,
    accessToken: null,
  });

  useEffect(() => {

    if (!userAuth.isLogin) {
      return;
    }

    const callAccessTokenAPI = async () => {
      try {
        return await client.post("/auth/refresh-token", {}, {
          withCredentials: true,
        }).then((response) => {
          return response.data.access_token.value;
        });
      } catch (e) {
        console.log(e);
        throw e;
      }
    };

    callAccessTokenAPI().then((accessToken) => {
      setAccessToken(accessToken);
    }).catch((e) => {
      if (e.response.status === 401) {
        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        navigate("/login");
      } else {
        alert("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        navigate("/");
      }
    });

  }, []);

  const goLoginPage = () => {
    navigate("/login");
  }

  const goRegisterPage = () => {
    navigate("/register");
  }

  const onLogout = () => {
    const cookies = new Cookies();
    cookies.remove("refresh_token");
  }

  return (
    <div className="h-36 w-full flex justify-between items-center">
      <h1 className="text-4xl mr-2">
        DEVLAB
      </h1>
      {accessToken ? (
        <div className="w-1/6.5 flex justify-between">
          <button className="ml-6 border-1 p-1 px-2 border-gray-600" onClick={goLoginPage}>
            내 정보
          </button>
          <button className="ml-6 border-1 p-1 px-2 border-gray-600" onClick={goRegisterPage}>
            로그아웃
          </button>
        </div>) : (
        <div className="w-1/6.5 flex justify-between">
          <button className="ml-6 border-1 p-1 px-2 border-gray-600" onClick={goLoginPage}>
            로그인
          </button>
          <button className="ml-6 border-1 p-1 px-2 border-gray-600" onClick={goRegisterPage}>
            회원가입
          </button>
        </div>)
      }
    </div>
  );
}

export default Header;
