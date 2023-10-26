import {useLocation, useNavigate} from "react-router-dom";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addComment, addLike, deletePost, getDetail} from "../actions/PostActions.jsx";
import {TagItem} from "../components/TagItem.jsx";
import {CommentDetail} from "../components/CommentDetail.jsx";
import Editor from "../components/Editor.jsx";

const PostDetail = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postDetails = useSelector(state => state.posts);
  const userAuth = useSelector(state => state.auth);
  const [comment, setComment] = useState("");

  const id = location.state.id;

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

  const onCommentHandler = (e) => {
    setComment(e);
  }

  const addCommentHandler = () => {

    if (!userAuth.isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (comment === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    const newComment = {
        contents: comment,
        author : userAuth.nickname,
        created_at: new Date().getTime(),
        modified_at: new Date().getTime(),
        post_id : id,
        like_count : 0,
    }

    dispatch(addComment(id, newComment, userAuth));
    setComment("");
  }

  const addLikeHandler = () => {
    if (!userAuth.isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }
    dispatch(addLike(id, userAuth));
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
      dispatch(deletePost(id, userAuth.accessToken));
      navigate(-1);
    }
  }

  return (
    <>
      <Header/>
      <Navbar/>
      <h1 className="text-xl mt-8 mb-2">
        {postDetails.title}
      </h1>
      <div>
        {postDetails.tags?.map((tag, index) => {
          return (
            <TagItem key={index} value={tag}/>
          )
        })}
      </div>
      <div id="metadata" className="text-sm text-gray-600 mt-3 flex justify-between border-b-1 pb-2">
        <div className="flex items-center">
          <div id="author">
            {postDetails.author}
          </div>
          <div className="w-[1px] h-[16px] bg-gray-400 mx-2"/>
          <div id="modifiedAt">
            {convertDetailTime(postDetails.modified_at)}
            {
              (postDetails.created_at !== postDetails.modified_at) &&
              <div className="inline-block text-gray-400 ml-1">
                (수정됨)
              </div>
            }
          </div>
          {
            (userAuth.isLogin && userAuth.nickname === postDetails.author) &&
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
            추천 {postDetails.like_count}
          </div>
          <div className="w-[1px] h-[16px] bg-gray-400 mx-4 my-auto"/>
          <div>
            조회 {postDetails.comment_details?.length}
          </div>
        </div>
      </div>
      <div id="contents" className="my-12" dangerouslySetInnerHTML={{__html: postDetails.contents}}/>
      <div className="flex justify-center">
        <button className="mx-auto py-1.5 border-1 border-gray-500 px-4 text-gray-700 bg-sky-50 rounded-lg flex justify-center items-center hover:bg-gray-200"
                onClick={addLikeHandler}>
          <img src="/public/thumbsup-1.svg" alt="thumbsup" className="w-6 inline-block mr-1"/>
          추천하기
        </button>
      </div>
      <div className="my-8">
        <div className="font-bold border-b-2 border-blue-700 pb-1">
          답변 {postDetails.comment_details?.length}
        </div>
        {postDetails.comment_details?.map((commentDetail, index) => {
          return (
            <CommentDetail key={index} commentDetail={commentDetail}/>
          );
        })}
      </div>
      <Editor contents={comment} onContentsHandler={onCommentHandler}/>
      <button className="mt-6 mb-12 bg-blue-600 text-white p-2 px-4 rounded-lg hover:bg-blue-700"
              onClick={addCommentHandler}>
        답변 작성하기
      </button>
    </>
  );
}

export default PostDetail;
