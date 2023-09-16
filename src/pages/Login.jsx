import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";

const Login = () => {
  return (
    <>
      <Header/>
      <Navbar/>
      <div id="body" className="h-[1024px] flex justify-center items-center">
        <div id="border" className="h-1/2 w-1/2 border-2 border-gray-200 flex flex-col justify-center items-center">
          <div id="input-box" className="h-1/5 w-3/5 border-1 border-slate-300 flex flex-col">
            <input id="id" className="flex-1 border-b-1 border-gray-300"/>
            <input id="password" className="flex-1"/>
          </div>
          <button id="login-button" className="h-12 w-3/5 my-8 bg-amber-500">
            로그인
          </button>
          <div id="social-box" className="h-1/5 w-2/3 bg-amber-500">
            <p className="text-center">
              소셜계정으로 로그인
            </p>
            <button>
              구글
            </button>
            <button>
              네이버
            </button>
            <button>
              카카오
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
