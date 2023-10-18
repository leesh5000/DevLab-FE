import {DateConverter} from "../utils/DateConverter.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addLikeComment} from "../actions/PostActions.jsx";

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

  return (
    <div className="py-4 border-b-1">
      <div className="text-sm text-gray-500 flex justify-between pb-2">
        <div className="flex items-center">
          <div id="author" className="font-semibold">
            {commentDetail.author}
          </div>
          <div className="w-[1px] h-[16px] bg-gray-400 mx-2"/>
          <button className="hover:text-blue-700 hover:underline hover:font-semibold" onClick={addLikeHandler}>
            추천 {commentDetail.like_count}
          </button>
        </div>
        <div id="modifiedAt">
          {DateConverter(commentDetail.modified_at)}
          {
            commentDetail.created_at !== commentDetail.modified_at ? (
              <div className="inline-block text-gray-400 ml-1">
                (수정됨)
              </div>
            ) : null
          }
        </div>
      </div>
      <div dangerouslySetInnerHTML={{__html: commentDetail.contents}}/>
    </div>
  );
}
