import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Cookies} from "react-cookie";
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../actions/UserAuthActions.js";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState(null);
  const userAuth = useSelector(state => state.userAuthReducer);

  useEffect(() => {

    if (!userAuth.isLogin) {
      return;
    }
    //
    // dispatch(getAccessToken())
    //   .catch(e => {
    //     console.log(e);
    //     if (e.response.status === 401) {
    //       alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
    //     } else {
    //       alert("일시적인 서버 오류입니다. 다시 로그인해주세요.");
    //     }
    //   });

  }, [userAuth]);

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
      {userAuth.isLogin ? (
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
