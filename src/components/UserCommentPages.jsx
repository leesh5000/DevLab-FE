import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {DateConverter} from "../utils/DateConverter.jsx";
import {Loading} from "./Loading.jsx";
import {Footer} from "./Footer.jsx";
import ReactPaginate from "react-paginate";
import {fetchUserCommentPages, setPage, setSort} from "../actions/UserCommentPageActions.jsx";
import {DownArrow} from "./DownArrow.jsx";
import {UpArrow} from "./UpArrow.jsx";
import {CategoryItem} from "./CategoryItem.jsx";
import dompurify from "dompurify";

export const UserCommentPages = ({id}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCommentPages = useSelector(state => state.userCommentPage);
  const pageInfo = userCommentPages.page_info;
  const startItem = Math.min(pageInfo.page * pageInfo.size + 1, userCommentPages.total_elements);
  const endItem = Math.min((pageInfo.page + 1) * pageInfo.size, userCommentPages.total_elements);

  useEffect(() => {
    dispatch(fetchUserCommentPages(id, pageInfo));
  }, [pageInfo, id]);

  const onCreatedSortHandler = () => {
    const order = pageInfo.sort.split(",")[1];
    const sort = "created_at," + (order === "desc" ? "asc" : "desc");
    dispatch(setSort(sort));
  }

  const onLikeSortHandler = () => {
    const order = pageInfo.sort.split(",")[1];
    const sort = "like_count," + (order === "desc" ? "asc" : "desc");
    dispatch(setSort(sort));
  }

  const onPageChangeHandler = (e) => {
    dispatch(setPage(e.selected));
  };

  const onTitleClickHandler = (commentPost) => {

    if (!commentPost.id) {
      alert("삭제된 게시물입니다.");
      return;
    }

    navigate(`/posts/${commentPost.id}/${encodeURI(commentPost.title)}`, {
      state: {
        id: commentPost.id
      }
    });
  }

  if (!userCommentPages.content) {
    return (
      <Loading/>
    )
  }

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 table-fixed">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-12 px-2 py-3">
              탭
            </th>
            <th scope="col" className="w-[480px] px-2 py-3">
              댓글 내용
            </th>
            <th scope="col" className="w-20 px-2 py-3 cursor-pointer" onClick={onCreatedSortHandler}>
              <div className="flex items-center justify-center">
                작성일
                {
                  pageInfo.sort.split(",")[0] === "created_at" && (
                    pageInfo.sort.split(",")[1] === "desc" ? <DownArrow/> : <UpArrow/>
                  )
                }
              </div>
            </th>
            <th scope="col" className="w-16 px-2 py-3 cursor-pointer" onClick={onLikeSortHandler}>
              <div className="flex items-center justify-center">
                추천
                {
                  pageInfo.sort.split(",")[0] === "like_count" && (
                    pageInfo.sort.split(",")[1] === "desc" ? <DownArrow/> : <UpArrow/>
                  )
                }
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
          {
            userCommentPages.content?.map((comment, index) => {
              return (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-2 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-white">
                    {
                      comment.post?.category === null ? '-' : <CategoryItem category={comment.post.category}/>
                    }
                  </th>
                  <td className="text-sky-700 h-10 px-2 py-4 text-left break-words hover:underline hover:text-sky-600 hover:cursor-pointer"
                      onClick={() => onTitleClickHandler(comment.post)}
                      dangerouslySetInnerHTML={{__html: dompurify.sanitize(String(comment.contents || "loading..."))}}/>
                  <td className="px-2 py-4">
                    {DateConverter(comment.created_at)}
                  </td>
                  <td className="px-2 py-4">
                    {comment.like_count}
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
      <div className="relative mt-8 mb-20">
        <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{startItem} - {endItem}</span> of <span className="font-semibold text-gray-900 dark:text-white">{userCommentPages.total_elements}</span></span>
          <ReactPaginate
            forcePage={pageInfo.page}
            containerClassName="pagination"
            activeLinkClassName="active-link"
            breakLabel="..."
            nextLabel="Next"
            onPageChange={onPageChangeHandler}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={userCommentPages?.total_pages}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
          />
        </nav>
      </div>
      <Footer/>
    </>
  );
};
