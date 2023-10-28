import {useLocation, useNavigate} from "react-router-dom";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addLikePost, fetchPost, removePost} from "../actions/PostActions.jsx";
import {TagItem} from "../components/TagItem.jsx";
import {PostComments} from "../components/PostComments.jsx";
import {CategoryItem} from "../components/CategoryItem.jsx";
import {Author} from "../components/Author.jsx";

const PostDetail = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector(state => state.posts);
  const userAuth = useSelector(state => state.auth);

  const id = location.state?.id;

  useEffect(() => {

    if (!location.state?.id) {
      alert("존재하지 않는 게시글입니다.");
      navigate(-1);
    }

    dispatch(fetchPost(id));
  }, []);

  const convertTime = (timeInMillis) => {
    const date = new Date(timeInMillis);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '.' + month + '.' + day + ' ' + hour + ':' + minute + ':' + second;
  }

  const addLikeHandler = () => {
    if (!userAuth.isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }
    dispatch(addLikePost(id, userAuth));
  }

  const onEditHandler = () => {
    navigate("/posting", {
      state: {
        mode: "edit",
        id: id,
      }
    })
  };

  const onDeleteHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(removePost(id, userAuth.accessToken));
      navigate(-1);
    }
  }

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="mt-12">
        <CategoryItem category={post.category}/>
        <h1 className="text-2xl text-gray-700 mt-4 mb-1">
          {post.title}
        </h1>
        <div>
          {post.tags?.map((tag, index) => {
            return (
              <TagItem key={index} value={tag}/>
            )
          })}
        </div>
      </div>
      <div id="metadata" className="text-sm text-gray-600 mt-3 flex justify-between border-b pb-3 border-gray-200">
        <div className="flex items-center">
          <Author {...post.author}/>
          <div className="w-[1px] h-[16px] bg-gray-400 mx-2"/>
          <div id="modifiedAt">
            {convertTime(post.modified_at)}
            {
              (post.created_at !== post.modified_at) &&
              <div className="inline-block text-gray-400 ml-1">
                (수정됨)
              </div>
            }
          </div>
          {
            (userAuth.isLogin && userAuth.nickname === post.author) &&
            <div className="text-gray-700 ml-4 flex">
              <button className="hover:text-blue-700 hover:underline flex items-center" onClick={onEditHandler}>
                <img src="/public/edit.svg" alt="edit" className="h-5 inline-block"/>
                수정
              </button>
              <button className="hover:text-blue-700 hover:underline ml-2 flex items-center" onClick={onDeleteHandler}>
                <img src="/public/delete.svg" alt="edit" className="h-4 inline-block"/>
                삭제
              </button>
            </div>
          }
        </div>
        <div className="flex">
          <div>
            추천 {post.like_count}
          </div>
          <div className="w-[1px] h-[16px] bg-gray-400 mx-4 my-auto"/>
          <div>
            조회 {10}
          </div>
        </div>
      </div>
      <div id="contents" className="text-sm mt-12 mb-20" dangerouslySetInnerHTML={{__html: post.contents}}/>
      <div className="flex justify-center">
        <button type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                onClick={addLikeHandler}>
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
            <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
          </svg>
          <p className="ml-1.5">{post.like_count}</p>
          <span className="sr-only">Icon description</span>
        </button>
      </div>
      <PostComments postId={id}/>
    </>
  );
}

export default PostDetail;
