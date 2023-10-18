import {useDispatch, useSelector} from "react-redux";
import {addLikeComment, deleteComment, editComment} from "../actions/PostActions.jsx";
import {TimeConverter} from "../utils/TimeConverter.jsx";
import Editor from "./Editor.jsx";
import {useEffect, useState} from "react";

export const CommentDetail = ({commentDetail}) => {

  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.auth);
  const [edit, setEdit] = useState(false);
  const [contents, setContents] = useState(commentDetail.contents);

  useEffect(() => {
    setContents(commentDetail.contents);
  }, []);

  const addLikeHandler = () => {

    if (!userAuth.isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    dispatch(addLikeComment(commentDetail.id, userAuth));
  }

  const onContentsHandler = (e) => {
    setContents(e);
  }

  const onEditHandler = () => {
    setEdit(true);
  }

  const onDeleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(deleteComment(commentDetail.post_id, commentDetail.id, userAuth));
    }
  }

  const onConfirmHandler = () => {
    dispatch(editComment(commentDetail.post_id, commentDetail.id, contents, userAuth))
      .then(() => {
        setEdit(false);
      });
  }

  const onCancelHandler = () => {
    setEdit(false);
  };

  return (
    <>
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
              (!edit && userAuth.isLogin && userAuth.nickname === commentDetail.author) &&
              <div className="ml-4 text-gray-600 flex">
                <button className="hover:text-blue-700 hover:underline flex items-center" onClick={onEditHandler}>
                  <img src="/public/edit.svg" alt="edit" className="h-4 inline-block text-sm"/>
                  수정
                </button>
                <button className="hover:text-blue-700 hover:underline ml-2 flex items-center"
                        onClick={onDeleteHandler}>
                  <img src="/public/delete.svg" alt="edit" className="h-4 inline-block text-sm"/>
                  삭제
                </button>
              </div>
            }
            {
              (edit && userAuth.isLogin && userAuth.nickname === commentDetail.author) &&
              <div className="ml-4 text-gray-600 flex">
                <button className="hover:text-blue-700 hover:underline flex items-center" onClick={onConfirmHandler}>
                  <img src="/public/confirm-2.svg" alt="edit" className="h-4 inline-block text-sm mr-0.5"/>
                  <p>확인</p>
                </button>
                <button className="hover:text-blue-700 hover:underline ml-2 flex items-center"
                        onClick={onCancelHandler}>
                  <img src="/public/cancel.svg" alt="edit" className="h-3 inline-block text-sm mr-0.5"/>
                  취소
                </button>
              </div>
            }
          </div>
        </div>
        {
          !edit && <div dangerouslySetInnerHTML={{__html: commentDetail.contents}}/>
        }
        {
          edit &&
          <div className="mt-2">
            <Editor contents={contents} onContentsHandler={onContentsHandler}/>
          </div>
        }
      </div>
    </>
  );
};
