import {useLocation, useNavigate} from "react-router-dom";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDetail, writeComment} from "../actions/PostActions.jsx";
import {TagItem} from "../components/TagItem.jsx";
import Editor from "../components/Editor.jsx";
import {CommentDetail} from "../components/CommentDetail.jsx";

const PostDetail = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postDetails = useSelector(state => state.postReducer);
  const userAuth = useSelector(state => state.userAuthReducer);

  const id = location.state.id;
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  const convertDetailTime = (timeInMillis) => {
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

  const onContentHandler = (e) => {

    if (!userAuth.isLogin) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    setComment(e);
  }

  const onComment = async () => {
    await dispatch(writeComment(id, comment, userAuth.accessToken));

  }

  return (
    <>
      <Header/>
      <Navbar/>
      <h1 className="text-xl mt-16 mb-2">
        {postDetails.title}
      </h1>
      <div>
        {postDetails.tags?.map((tag, index) => {
          return (
            <TagItem key={index} value={tag}/>
          )
        })}
      </div>
      <div id="metadata" className="text-sm text-gray-600 mt-4 flex justify-between border-b-1 pb-2">
        <div className="flex items-center">
          <div id="author">
            {postDetails.author}
          </div>
          <div className="w-[1px] h-[16px] bg-gray-400 mx-2"/>
          <div id="modifiedAt">
            {convertDetailTime(postDetails.modified_at)}
            {
              postDetails.created_at !== postDetails.modified_at ? (
                <div className="inline-block text-gray-400 ml-1">
                  (수정됨)
                </div>
              ) : null
            }
          </div>
        </div>
        <div className="flex">
          <div>
            추천 {postDetails.like_count}
          </div>
          <div className="w-[1px] h-[16px] bg-gray-400 mx-4 my-auto"/>
          <div>
            조회 {postDetails.comment_details?.length}
          </div>
        </div>
      </div>
      <div id="contents" className="py-12" dangerouslySetInnerHTML={{__html: postDetails.contents}}/>
      <div className="flex justify-center">
        <button className="bg-blue-300 mx-auto my-8 border-b-1 p-2">
          추천하기
        </button>
      </div>
      <div className="mb-8">
        <div className="font-bold mt-8 border-b-2 border-sky-600 pb-1">
          답변 {postDetails.comment_details?.length}
        </div>
        {postDetails.comment_details?.map((commentDetail, index) => {
          return (
            <CommentDetail key={index} commentDetail={commentDetail}/>
          );
        })}
      </div>
      <Editor onContentHandler={onContentHandler}/>
      <button className="mt-6 mb-12 bg-blue-600 text-white p-2 px-4 rounded-lg hover:bg-blue-700"
              onClick={onComment}>
        답변 작성하기
      </button>
    </>
  );
}

export default PostDetail;
