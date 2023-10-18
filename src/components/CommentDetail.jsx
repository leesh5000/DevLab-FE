import {useDispatch, useSelector} from "react-redux";
import {addLikeComment} from "../actions/PostActions.jsx";
import {TimeConverter} from "../utils/TimeConverter.jsx";

export const CommentDetail = ({commentDetail}) => {

  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.auth);

  const addLikeHandler = () => {

    if (!userAuth.isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    dispatch(addLikeComment(commentDetail.id, userAuth));
  }

  const onEditHandler = () => {

  }

  const onDeleteHandler = () => {

  }

  return (
    <div className="py-4 border-b-1">
      <div className="text-sm text-gray-500 flex justify-between pb-2">
        <div className="flex items-center">
          <div id="author" className="font-semibold">
            {commentDetail.author}
          </div>
          <div className="w-[1px] h-[16px] bg-gray-400 mx-2"/>
          <div id="modifiedAt">
            {TimeConverter(commentDetail.modified_at)}
            {
              commentDetail.created_at !== commentDetail.modified_at ? (
                <div className="inline-block text-gray-400 ml-1">
                  (수정됨)
                </div>
              ) : null
            }
          </div>
        </div>
        <div className="flex">
          <button className="hover:text-blue-700 hover:underline hover:font-semibold" onClick={addLikeHandler}>
            추천 {commentDetail.like_count}
          </button>
          {
            (userAuth.isLogin && userAuth.nickname === commentDetail.author) &&
            <div className="ml-4 text-gray-600">
              <button className="hover:text-blue-700 hover:underline" onClick={onEditHandler}>
                <img src="/public/edit.svg" alt="edit" className="h-4 inline-block text-sm"/>
                수정
              </button>
              <button className="hover:text-blue-700 hover:underline ml-2" onClick={onDeleteHandler}>
                <img src="/public/delete.svg" alt="edit" className="h-3 inline-block text-sm"/>
                삭제
              </button>
            </div>
          }
        </div>
      </div>
      <div dangerouslySetInnerHTML={{__html: commentDetail.contents}}/>
    </div>
  );
}
