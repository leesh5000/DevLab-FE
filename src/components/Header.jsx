import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/AuthActions.jsx";
import 'flowbite';
import {useEffect} from "react";
import {initFlowbite} from "flowbite";

const Header = () => {

  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.auth);

  useEffect (() => {
    initFlowbite();
  }, [userAuth]);
  const onLogoutHandler = () => {
    dispatch(logout()).then(() => {
      window.location.href = "/";
    });
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
        <a href="/" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
        {
          !userAuth.isLogin ? (
            <a href="/login" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              로그인
            </a>
          ) : (
            <div className="flex items-center md:order-2">
              <button type="button" data-dropdown-toggle="profile-dropdown-menu" className="inline-flex items-center font-medium text-sm justify-center px-4 py-2 text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                <div className="relative w-7 h-7 mr-3 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
                  <svg className="absolute w-9 h-9 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
                {userAuth.nickname}
              </button>
              <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700" id="profile-dropdown-menu">
                <ul className="py-2 font-medium" role="none">
                  <li>
                    <Link to={`/posting`} className="block px-4 pr-20 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                      <div className="inline-flex items-center">
                        새 글 작성
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/users/${encodeURI(userAuth.nickname)}`} state={{nickname: userAuth.nickname}} className="block px-4 pr-20 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                      내 프로필
                    </Link>
                  </li>
                  <li>
                    <button className="block px-4 pr-20 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" onClick={onLogoutHandler}>
                      <div className="inline-flex items-center">
                        로그아웃
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )
        }
      </div>
    </nav>
  );
}

export default Header;
