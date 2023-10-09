import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Header = () => {

  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  const goLoginPage = () => {
    navigate("/login");
  }

  const goRegisterPage = () => {
    navigate("/register");
  }

  return (
    <div className="h-36 w-full flex justify-between items-center">
      <h1 className="text-4xl mr-2">
        DEVLAB
      </h1>
      <div className="w-1/6.5 flex justify-between">
        <button className="ml-6 border-1 p-1 px-2 border-gray-600" onClick={goLoginPage}>
          로그인
        </button>
        <button className="ml-6 border-1 p-1 px-2 border-gray-600" onClick={goRegisterPage}>
          회원가입
        </button>
      </div>
    </div>
  )
}

export default Header;
