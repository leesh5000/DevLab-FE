import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {useState} from "react";
import client from "../lib/client.jsx";
import {Loading} from "../components/Loading.jsx";
import {Footer} from "../components/Footer.jsx";

export const FindIdPage = () => {

  const [securityCode, setSecurityCode] = useState("")
  const [loginId, setLoginId] = useState("")
  const [loading, setLoading] = useState(false)
  const [oauthLoginId, setOauthLoginId] = useState("")

  const securityCodeChangeHandler = (e) => {
    setSecurityCode(e.target.value);
  }

  const findIdHandler = (e) => {

    e.preventDefault();
    setLoading(true);
    async function findLoginId() {
      return await client.post('/auth/find-id', {
        security_code: securityCode
      })
        .then(res => res.data)
        .catch((e) => {
          if (e.response.status === 404) {
            alert("일치하는 보안코드가 없습니다.");
            throw e;
          }
        });
    }

    findLoginId()
      .then(res => {
        if (res.oauth_type) {
          setOauthLoginId(res.oauth_type);
        } else {
          setLoginId(res.login_id);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <>
        <Loading/>
      </>
    );
  }

  return (
    <>
      <Header/>
      <Navbar/>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
              DevLab
          </a>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              아이디 찾기
            </h1>
            <p className=" text-gray-700 dark:text-gray-400"><span className="text-blue-600">회원가입 시 인증한 이메일로 전송된 보안코드</span>를 입력해주세요. 보안코드를 발급받지 않는 경우에는 관리자에게 문의해주세요.</p>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={findIdHandler}>
              <div>
                <label htmlFor="security_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">보안코드</label>
                <input type="security_code" name="security_code" id="security_code"
                       disabled={loginId !== "" || oauthLoginId !== ""} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="******" required="" onChange={securityCodeChangeHandler}/>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                확인
              </button>
            </form>
          </div>
          {
            loginId && (
              <>
                <p className="text-xl my-4">
                  요청하신 아이디는 <span className="font-semibold text-red-600">{loginId}</span> 입니다.
                </p>
                <a href="/find-password" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  비밀번호 찾기
                </a>
              </>
            )
          }
          {
            oauthLoginId && (
              <>
                <p className="text-xl my-4">
                  요청하신 아이디는 <span className="font-semibold text-red-600">{oauthLoginId}</span> 소셜 계정으로 회원가입 된 아이디 입니다.<br/>
                  소셜 계정으로 로그인 해주세요.
                </p>
              </>
            )
          }
        </div>
      </section>
      <Footer/>
    </>
  );
}
