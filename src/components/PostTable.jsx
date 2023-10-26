import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import Categories from "../utils/Categories.jsx";
import {DateConverter} from "../utils/DateConverter.jsx";
import {Loading} from "./Loading.jsx";
import {TagItem} from "./TagItem.jsx";
import "../pagination.css";
import ReactPaginate from "react-paginate";
import {fetchPostPages} from "../actions/HomeActions.jsx";
import {DownArrow} from "./DownArrow.jsx";
import {UpArrow} from "./UpArrow.jsx";

function PostTable() {

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const postPages = useSelector(state => state.home);
  const pageInfo = {
    page: searchParams.get("page") || 0,
    size: 20,
    sort: searchParams.get("sort") ? searchParams.get("sort") : "created_at,desc",
  }
  const startItem = Math.min(pageInfo.page * pageInfo.size + 1, postPages.total_elements);
  const endItem = Math.min((pageInfo.page + 1) * pageInfo.size, postPages.total_elements);

  useEffect(() => {

    async function getPages() {
      setLoading(true);
      await dispatch(fetchPostPages({
          page: Math.max(searchParams.get("page") - 1, 0),
          size: pageInfo.size,
          sort: searchParams.get("sort") ? searchParams.get("sort") : "created_at,desc",
          category: searchParams.get("category") === "ALL" ? null : searchParams.get("category"),
          keyword: searchParams.get("keyword"),
        })
      );
    }

    getPages().then(() => {
      setLoading(false);
    });

  }, [searchParams]);

  const onCreatedSortHandler = () => {
    const order = pageInfo.sort.split(",")[1];
    const sort = "created_at," + (order === "desc" ? "asc" : "desc");
    searchParams.set("sort", sort);
    setSearchParams(searchParams);
  }

  const onLikeSortHandler = () => {
    const order = pageInfo.sort.split(",")[1];
    const sort = "like_count," + (order === "desc" ? "asc" : "desc");
    searchParams.set("sort", sort);
    setSearchParams(searchParams);
  }

  const onViewsSortHandler = () => {
    const order = pageInfo.sort.split(",")[1];
    const sort = "view_count," + (order === "desc" ? "asc" : "desc");
    searchParams.set("sort", sort);
    setSearchParams(searchParams);
  }

  const onPageChangeHandler = (e) => {
    searchParams.set("page", e.selected + 1);
    setSearchParams(searchParams);
  }

  if (loading) {
    console.log("hello")
    return (
      <Loading/>
    )
  }

  return (
    <>
      <div className="relative">
        <table className="w-full text-sm text-left text-gray-500 table-fixed">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className="text-center">
            <th scope="col" className="w-10 px-3 py-3">
              탭
            </th>
            <th scope="col" className="w-[460px] px-3 py-3">
              제목 & 태그
            </th>
            <th scope="col" className="w-20 px-2 py-3">
              작성자
            </th>
            <th scope="col" className="w-20 px-2 py-3 hover:cursor-pointer" onClick={onCreatedSortHandler}>
              <div className="flex items-center justify-center">
                작성일
                {
                  pageInfo.sort.split(",")[0] === "created_at" && (
                    pageInfo.sort.split(",")[1] === "desc" ? <DownArrow/> : <UpArrow/>
                  )
                }
              </div>
            </th>
            <th scope="col" className="w-12 px-2 py-3 hover:cursor-pointer" onClick={onViewsSortHandler}>
              <div className="flex items-center justify-center">
                조회
                {
                  pageInfo.sort.split(",")[0] === "view_count" && (
                    pageInfo.sort.split(",")[1] === "desc" ? <DownArrow/> : <UpArrow/>
                  )
                }
              </div>
            </th>
            <th scope="col" className="w-12 px-2 py-3 hover:cursor-pointer" onClick={onLikeSortHandler}>
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
              postPages.content?.map((post, index) => {
                return (
                  <tr key={index} className="bg-white border-b">
                    <td scope="row" className="text-center w-10 px-3 py-3">
                      <strong className="font-semibold">{Categories[post.category]}</strong>
                    </td>
                    <td scope="row" className="px-3 py-3 h-20">
                      <Link to={`/posts/${encodeURI(post.title)}`} state={{id : post.id}} className="text-sky-700 hover:text-sky-500 hover:underline hover:cursor-pointer">
                        {post.title}
                        {
                          (post.comment_count !== 0) &&
                          <p className="inline text-xs ml-1">
                            [{post.comment_count}]
                          </p>
                        }
                      </Link>
                      <div className="block">
                        {post.tags.map((tag, index) => {
                          return (
                            <TagItem key={index} value={tag}/>
                          )
                        })}
                      </div>
                    </td>
                    <td scope="row" className="w-20 text-sm text-center px-2 py-3 text-ellipsis whitespace-nowrap overflow-hidden">
                      {post.author}
                    </td>
                    <td scope="row" className="w-20 text-center px-2 py-3">
                      {DateConverter(post.created_at)}
                    </td>
                    <td scope="row" className="w-12 text-center px-2 py-3">
                      14
                    </td>
                    <td scope="row" className="w-12 text-center px-2 py-3">
                      {post.like_count}
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      <div className="relative my-16">
        <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{startItem} - {endItem}</span> of <span className="font-semibold text-gray-900 dark:text-white">{postPages.total_elements}</span></span>
          <ReactPaginate
            forcePage={pageInfo.page - 1 < 0 ? 0 : pageInfo.page - 1}
            containerClassName="pagination"
            activeLinkClassName="active-link"
            breakLabel="..."
            nextLabel="Next"
            onPageChange={onPageChangeHandler}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={postPages.total_pages}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
          />
        </nav>
      </div>
    </>
  );
}

export default PostTable;
