import client from "../lib/client.jsx";
import {useState} from "react";

export const SecurityCheck = ({securityCheck, setSecurityCheck}) => {

  const [loginId, setLoginId] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const checkSecurityCodeHandler = (e) => {
    e.preventDefault();
    client.post('/auth/security-code-checks', {
      login_id: loginId,
      security_code: securityCode
    })
      .then(res => {
        setSecurityCheck(true);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          alert("존재하지 않는 아이디입니다.");
        } else if (e.response.status === 403) {
          alert("일치하지 않는 보안코드입니다.");
        }
        throw e;
      });
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          DevLab
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            비밀번호 변경
          </h2>
          <form className="my-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={checkSecurityCodeHandler}>
            <div>
              <label form="login_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">로그인 아이디</label>
              <input type="login_id" name="login_id" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ID" required=""
                     onChange={(e) => {setLoginId(e.target.value)}}/>
            </div>
            <div>
              <label form="security_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">보안코드</label>
              <input type="security_code" name="security_code" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                     onChange={(e) => {setSecurityCode(e.target.value)}}/>
            </div>
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">확인</button>
          </form>
        </div>
      </div>
    </section>
  )
}

