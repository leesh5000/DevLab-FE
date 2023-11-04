import {useEffect, useState} from "react";
import {Loading} from "./Loading.jsx";
import ReactPaginate from "react-paginate";
import {TimeConverter} from "../utils/TimeConverter.jsx";
import {useDispatch, useSelector} from "react-redux";
import Editor from "./Editor.jsx";
import {
  addLike,
  createPostComment,
  deletePostComment,
  editPostComment,
  fetchPostComments
} from "../actions/PostCommentActions.jsx";
import {Author} from "./Author.jsx";
import editImg from "../../src/public/edit.svg";
import deleteImg from "../../src/public/delete.svg";
import checkImg from "../../src/public/confirm-2.svg";
import cancelImg from "../../src/public/cancel.svg";
import dompurify from "dompurify";

export const PostComments = ({postId}) => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [editModeCommentId, setEditModeCommentId] = useState("");
  const userAuth = useSelector(state => state.auth);
  const postComments = useSelector(state => state.postComments);
  const [editCommentContents, setEditCommentContents] = useState("");
  const [commentContents, setCommentContents] = useState("");
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 12,
    sort: "createdAt,desc"
  });
  const startItem = Math.min(pageInfo.page * pageInfo.size + 1, postComments.total_elements);
  const endItem = Math.min((pageInfo.page + 1) * pageInfo.size, postComments.total_elements);

  useEffect(() => {

    const fetch = async () => {
      setLoading(true);
      await dispatch(fetchPostComments(postId, pageInfo))
    }

    fetch().then(() => {
      setLoading(false);
    })

  }, [pageInfo]);

  const likeHandler = (commentId) => {

    if (!userAuth.isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    dispatch(addLike(commentId, userAuth.accessToken))
      .then(() => {
        alert("추천하였습니다.")
      })
      .catch((e) => {
        if (e.response.status === 409) {
          alert("이미 추천한 댓글입니다.")
        }
      });
  }

  const onEditModeHandler = (commentId, contents) => {
    setEditModeCommentId(commentId);
    setEditCommentContents(contents);
  }

  const onDeleteHandler = (commentId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(deletePostComment(commentId, userAuth.accessToken))
        .then(() => {
          location.reload();
        });
    }
  }

  const onEditConfirmHandler = (commentId, contents) => {
    dispatch(editPostComment(postId, commentId, contents, userAuth.accessToken))
      .then(() => {
        setEditModeCommentId("");
      });
  }

  const onEditCommentContentsHandler = (e) => {
    setEditCommentContents(e);
  }

  const onCancelHandler = () => {
    setEditModeCommentId("");
  };

  const onPageChangeHandler = (page) => {
    setPageInfo({
      ...pageInfo,
      page: page.selected
    });
  }

  const onSortChangeHandler = (e) => {
    setPageInfo({
      ...pageInfo,
      sort: e.target.value
    });
  }

  const commentContentHandler = (e) => {
    setCommentContents(e);
  }

  const createCommentHandler = () => {

    if (!userAuth.isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (commentContents === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    dispatch(createPostComment(postId, commentContents, userAuth.accessToken))
      .then(() => {
        window.location.reload();
      });

    setCommentContents("");
  }

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <>
      <div className="flex border-b-2 border-blue-700 pb-2 mt-8 items-end justify-between">
        <div className="font-semibold">
          답변 {postComments.total_elements}
        </div>
        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={pageInfo.sort} onChange={onSortChangeHandler}>
          <option value="creted_at,desc">생성일 순</option>
          <option value="modified_at,desc">수정일 순</option>
          <option value="like_count,desc">추천 순</option>
        </select>
      </div>
      {
        postComments.content.map((comment, key) => (
          <div key={key} className="py-4 border-b border-gray-200">
            <div className="text-sm text-gray-500 flex justify-between">
              <div className="flex items-center">
                <p className="font-semibold">
                  <Author {...comment.author}/>
                </p>
                <div className="w-[1px] h-[14px] bg-gray-400 mx-2"/>
                <div id="modifiedAt">
                  {TimeConverter(comment.modified_at)}
                  {
                    comment.created_at !== comment.modified_at ? (
                      <div className="inline-block text-gray-400 ml-1">
                        (수정됨)
                      </div>
                    ) : null
                  }
                </div>
              </div>
              <div className="flex">
                <button className="flex mr-4 items-center hover:text-blue-700 hover:underline hover:font-semibold" onClick={() => {likeHandler(comment.id)}}>
                  <svg className="w-3 h-3 mr-1 text-gray-600 dark:text-white inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.008 8.714c1-.097 1.96-.45 2.792-1.028a25.112 25.112 0 0 0 4.454-5.72 1.8 1.8 0 0 1 .654-.706 1.742 1.742 0 0 1 1.65-.098 1.82 1.82 0 0 1 .97 1.128c.075.248.097.51.065.767l-1.562 4.629M4.008 8.714H1v9.257c0 .273.106.535.294.728a.99.99 0 0 0 .709.301h1.002a.99.99 0 0 0 .71-.301c.187-.193.293-.455.293-.728V8.714Zm8.02-1.028h4.968c.322 0 .64.08.925.232.286.153.531.374.716.645a2.108 2.108 0 0 1 .242 1.883l-2.36 7.2c-.288.813-.48 1.354-1.884 1.354-2.59 0-5.39-1.06-7.504-1.66"/>
                  </svg>
                  {comment.like_count}
                </button>
                {
                  (userAuth.isLogin && (userAuth.id === comment.author.id)) && (editModeCommentId !== comment.id) &&
                  <div className="text-gray-600 flex">
                    <button className="hover:text-blue-700 hover:underline flex items-center" onClick={() => {onEditModeHandler(comment.id, comment.contents)}}>
                      <img src={editImg} alt="edit" className="h-4 inline-block text-sm"/>
                      수정
                    </button>
                    <button className="hover:text-blue-700 hover:underline ml-2 flex items-center"
                            onClick={() => {onDeleteHandler(comment.id)}}>
                      <img src={deleteImg} alt="edit" className="h-4 inline-block text-sm"/>
                      삭제
                    </button>
                  </div>
                }
                {
                  ((editModeCommentId === comment.id) && userAuth.isLogin && (userAuth.id === comment.author.id)) &&
                  <div className="text-gray-600 flex">
                    <button className="hover:text-blue-700 hover:underline flex items-center" onClick={() => {onEditConfirmHandler(comment.id, editCommentContents)}}>
                      <img src={checkImg} alt="edit" className="h-4 inline-block text-sm mr-0.5"/>
                      확인
                    </button>
                    <button className="hover:text-blue-700 hover:underline ml-2 flex items-center"
                            onClick={onCancelHandler}>
                      <img src={cancelImg} alt="edit" className="h-3 inline-block text-sm mr-0.5"/>
                      취소
                    </button>
                  </div>
                }
              </div>
            </div>
            {
              (editModeCommentId !== comment.id) ?
                <div id="commentContents" className="text-sm pt-2 break-words" dangerouslySetInnerHTML={{__html: dompurify.sanitize(String(comment.contents || "loading..."))}}/> :
                <div className="mt-2">
                  <Editor contents={editCommentContents} onContentsHandler={onEditCommentContentsHandler}/>
                </div>
            }
          </div>
        ))
      }
      <div className="my-12">
        <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{startItem} - {endItem}</span> of <span className="font-semibold text-gray-900 dark:text-white">{postComments.total_elements}</span></span>
          <ReactPaginate
            forcePage={pageInfo.page}
            containerClassName="pagination"
            activeLinkClassName="active-link"
            breakLabel="..."
            nextLabel="Next"
            onPageChange={onPageChangeHandler}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={postComments.total_pages}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
          />
        </nav>
      </div>
      <Editor contents={commentContents} onContentsHandler={commentContentHandler}/>
      <button className="mt-6 mb-12 bg-blue-600 text-white p-2 px-4 rounded-lg hover:bg-blue-700"
              onClick={createCommentHandler}>
        답변 작성하기
      </button>
    </>
  )
}
