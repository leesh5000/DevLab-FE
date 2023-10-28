import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initFlowbite} from "flowbite";
import {fetchMyProfile, fetchUserProfile, updateUserProfile} from "../actions/UserActions.jsx";
import {EmailAuthenticator} from "../components/EmailAuthenticator.jsx";
import client from "../lib/client.jsx";
import validator from "../utils/validator.js";
import {useLocation, useNavigate} from "react-router-dom";
import {UserPostPages} from "../components/UserPostPages.jsx";
import {Loading} from "../components/Loading.jsx";
import {UserCommentPages} from "../components/UserCommentPages.jsx";

const Profile = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);

  const [emailAuthenticator, setEmailAuthenticator] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [userInput, setUserInput] = React.useState({
    loginId: "",
    nickname: "",
    introduce: "",
    email: "",
    isVerified: false,
    isDuplicatedNickname: false,
  });
  const inputRef = React.useRef();

  const [activeTab, setActiveTab] = React.useState('posts');
  const activeTabCss = "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500";
  const inactiveTabCss = "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";
  const id = location.state?.id;

  useEffect(() => {
    console.log(id);
    if (!id) {
      alert("잘못된 접근입니다.")
      navigate("/");
    }

    if (auth.isLogin && auth.id === id) {
      dispatch(fetchMyProfile(auth.accessToken));
    } else {
      dispatch(fetchUserProfile(id));
    }

  }, [auth, location]);

  useEffect(() => {
    initFlowbite();
    setEditMode(false);
  }, [emailAuthenticator, location]);

  const isMyProfile = () => {
    return auth.isLogin && auth.id === id;
  }

  const onEditMode = () => {
    setEditMode(true);
    setUserInput({
      ...userInput,
      nickname: users.nickname,
      introduce: users.introduce,
    })
    inputRef.current.classList.replace("block", "hidden");
  }

  const onEmailAuthenticator = () => {
    setEmailAuthenticator(true);
    onEditMode();
  }

  const allClosed = () => {
    setEditMode(false);
    setEmailAuthenticator(false);
  }

  const onNicknameChangeHandler = (e) => {

    client.get("/auth/nickname-checks", {
      params: {
        nickname: e.target.value,
      }
    }).then(() => {
      setUserInput({
        ...userInput,
        nickname: e.target.value,
        isDuplicatedNickname: false,
      });
    }).catch((error) => {
      if (error.response.status === 409) {
        setUserInput({
          ...userInput,
          nickname: e.target.value,
          isDuplicatedNickname: true,
        });
      }
    });
  };

  const onIntroduceChangeHandler = (e) => {
    setUserInput({
      ...userInput,
      introduce: e.target.value,
    });
  }

  const onSubmitUpdateUser = (e) => {

    e.preventDefault()

    if (!validator.nickname.test(userInput.nickname) || userInput.isDuplicatedNickname) {
      console.log(userInput)
      alert("닉네임을 바르게 입력해주세요.");
      return;
    }

    if (userInput.isVerified && !validator.email.test(userInput.email)) {
      alert("이메일을 바르게 입력해주세요.");
      return;
    }

    if (userInput.introduce.length > 150) {
      alert("내 소개는 150 글자 이하로만 가능합니다.")
      return;
    }

    dispatch(updateUserProfile(auth.accessToken, users.id, userInput))
      .then(() => {
        alert("회원정보가 수정되었습니다.");
        location.reload();
      });
    setEditMode(false);
  }

  const convertRegisterDate = (registerTimeInMillis) => {
    const localDate = new Date(registerTimeInMillis);
    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1;
    const day = localDate.getDate();
    const hours = ("0" + localDate.getHours()).slice(-2);
    const minutes = ("0" + localDate.getMinutes()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  if (!users.id) {
    return (
      <>
        <Loading/>
      </>
    )
  }

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="relative w-full mx-auto my-24 max-w-lg border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {
          isMyProfile() && (
            <div className="absolute right-0 flex justify-end px-4 pt-4">
              <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                <span className="sr-only">Open dropdown</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
              </button>
              <div ref={inputRef} id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2" aria-labelledby="dropdownButton">
                  <li>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer" onClick={onEditMode}>
                      수정
                    </a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
          )
        }
        <form className="flex flex-col items-center py-10" onSubmit={onSubmitUpdateUser}>
          <div className="relative w-32 h-32 mb-4 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
            <svg className="absolute w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{users.nickname || ''}</h5>
          <button type="button" data-popover-target="popover-default" className="my-2 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 px-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
            </svg>
            <p className="ml-1.5">{users.postLikeCount + users.commentLikeCount}</p>
            <span className="sr-only">Icon description</span>
            <div data-popover="" id="popover-default" role="tooltip" className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
              <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">총 추천 수</h3>
              </div>
              <div className="px-3 py-2 text-left">
                <p>해당 유저가 작성한 게시물, 댓글이 받은 총 추천 수를 나타냅니다.</p>
              </div>
              <div data-popper-arrow=""></div>
            </div>
          </button>
          <div className="">
            <div className="space-y-6 w-96">
              {
                isMyProfile() && (
                  <div className="relative z-0">
                    <input type="text" id="id" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " value={users.loginId || `${users?.oauth?.type} 소셜 계정` || ''} disabled={true}/>
                    <label htmlFor="id" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      아이디
                    </label>
                  </div>
                )
              }
              {
                editMode ? (
                  <div>
                    <div className="relative z-0">
                      <input type="text" id="standard_error" aria-describedby="standard_error_help" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-primary-600 appearance-none dark:text-white dark:border-primary-500 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer"
                             placeholder=" " defaultValue={users.nickname} onChange={onNicknameChangeHandler} autoFocus={true}/>
                      <label htmlFor="standard_error" className="absolute text-sm text-primary-600 dark:text-primary-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">새 닉네임 (2-20 자리의 한글/영어/숫자 조합)</label>
                    </div>
                    {
                      userInput.isDuplicatedNickname && <p id="standard_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400">이미 존재하는 닉네임입니다.</p>
                    }
                  </div>
                ) : (
                  <div className="relative z-0">
                    <input type="text" id="nickname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " value={users.nickname || ''} disabled={true}/>
                    <label htmlFor="nickname" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">닉네임</label>
                  </div>
                )
              }
              {
                isMyProfile() && (
                  <div className="relative z-0">
                    <input type="text" id="security_code" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " value={users.securityCode || ''} disabled={true}/>
                    <label htmlFor="security_code" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">보안코드</label>
                    <div className="mt-2 text-sm font-light text-gray-500 dark:text-gray-400">
                      {
                        !users.securityCode && (emailAuthenticator ? (
                          <a className="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:cursor-pointer" onClick={allClosed}>
                            보안코드 생성 취소
                          </a>) :
                          (<>
                            <a data-popover-target="popover-right" data-popover-placement="right" className="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:cursor-pointer" onClick={onEmailAuthenticator}>
                              보안코드 생성하기
                            </a>
                            <div data-popover="" id="popover-right" role="tooltip" className="absolute z-10 invisible inline-block w-96 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                              <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                                <h3 className="font-semibold text-gray-900 dark:text-white">보안코드란?</h3>
                              </div>
                              <div className="px-3 py-2">
                                <p>보안코드는 <strong className="font-thin text-primary-700">아이디/패스워드 찾기에 사용되며, 이메일 인증을 완료한 후 생성</strong>됩니다.</p>
                              </div>
                              <div data-popper-arrow=""></div>
                            </div>
                          </>)
                        )
                      }
                      {
                        !users.securityCode && emailAuthenticator && <EmailAuthenticator userInput={userInput} setUserInput={setUserInput}/>
                      }
                    </div>
                  </div>
                )
              }
              <div className="relative z-0">
                <input type="text" id="id" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       placeholder=" " value={convertRegisterDate(users.createdAt)} disabled={true}/>
                <label htmlFor="id" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  가입일
                </label>
              </div>
              <div>
                <label htmlFor="introduce" className={"block mb-2 text-sm dark:text-white " + `${editMode ? 'text-primary-700' : 'text-gray-700'}`}>내 소개</label>
                {
                  editMode ?
                    <textarea id="introduce" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-primary-700 focus:ring-blue-700 focus:border-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700" placeholder="Write your thoughts here..."
                              defaultValue={users.introduce || ''} onChange={onIntroduceChangeHandler}>
                    </textarea> :
                    <textarea id="introduce" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."
                              defaultValue={users.introduce || ''} disabled={true}>
                    </textarea>
                }
                {
                  editMode &&
                  <p className="flex justify-end text-xs text-gray-700">
                    {userInput.introduce?.length} / 150
                  </p>
                }
              </div>
            </div>
          </div>
          {
            editMode && (
              <div className="flex space-x-3 md:mt-6">
                <button type="submit"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  저장
                </button>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                        onClick={allClosed}>
                  취소
                </button>
              </div>
            )
          }
        </form>
      </div>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="mr-2">
          <button aria-current="page" className={activeTab === 'posts' ? activeTabCss : inactiveTabCss} onClick={() => {setActiveTab("posts")}}>
            {isMyProfile() ? '내 게시글' : `${users.nickname}의 게시글`}
          </button>
        </li>
        <li className="mr-2">
          <button className={activeTab === 'comments' ? activeTabCss : inactiveTabCss} onClick={() => {setActiveTab("comments")}}>
            {isMyProfile() ? '내 댓글' : `${users.nickname}의 댓글`}
          </button>
        </li>
        <li className="mr-2">
          <button className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
            추천한 게시글
          </button>
        </li>
        <li className="mr-2">
          <button className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
            추천한 댓글
          </button>
        </li>
      </ul>
      {
        activeTab === 'posts' && <UserPostPages id={users.id}/>
      }
      {
        activeTab === 'comments' && <UserCommentPages id={users.id}/>
      }
    </>
  );
}

export default Profile
