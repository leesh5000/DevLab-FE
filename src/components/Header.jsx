import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAccessToken, logout} from "../actions/UserAuthActions.jsx";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.auth);

  useEffect (() => {
    if (userAuth.isLogin) {
      dispatch(fetchAccessToken());
    }
  }, []);

  const onLogoutHandler = () => {
    dispatch(logout());
  }

  return (
    <div className="h-28 w-full flex justify-between items-center">
      <h1 className="text-4xl mr-2">
        <Link to="/">
          DEVLAB
        </Link>
      </h1>
      {userAuth.isLogin ?
        (<div className="w-1/6.5 flex justify-between items-center">
          <p>
            {userAuth.nickname} 님
          </p>
          <Link to="profile" className="ml-6 border-1 p-1 px-2 border-gray-600">
            내 정보
          </Link>
          <button className="ml-6 border-1 p-1 px-2 border-gray-600" onClick={onLogoutHandler}>
            로그아웃
          </button>
        </div>) :
        (<div className="w-1/6.5 flex justify-between">
          <Link to="/login" className="ml-6 border-1 p-1 px-2 border-gray-600">
            로그인
          </Link>
          <Link to="/register" className="ml-6 border-1 p-1 px-2 border-gray-600">
            회원가입
          </Link>
        </div>)
      }
    </div>
  );
}

export default Header;
