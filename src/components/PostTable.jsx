import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPage} from "../actions/PostActions.jsx";
import {Link, useSearchParams} from "react-router-dom";
import Categories from "../utils/Categories.jsx";
import {DateConverter} from "../utils/DateConverter.jsx";
import PaginatedItems from "../lib/PaginatedItems.jsx";
import {Loading} from "./Loading.jsx";
import {TagItem} from "./TagItem.jsx";

function PostTable() {

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const postPage = useSelector(state => state.posts);

  const pageSize = 20;
  const category = searchParams.get("category") === "ALL" ? null : searchParams.get("category");
  const currentPage = Math.max(searchParams.get("page") - 1, 0);
  const keyword = searchParams.get("keyword");
  const sort = searchParams.get("sort") || "created_at,desc";

  useEffect(() => {
    const pageInfo = {
      page: currentPage,
      size: pageSize,
      sort: sort,
    }
    dispatch(getPage(category, pageInfo, keyword));
  }, [searchParams, sort]);

  const onCreatedSortHandler = () => {
    const order = sort.split(",")[1];
    searchParams.set("sort", "created_at," + (order === "desc" ? "asc" : "desc"));
    setSearchParams(searchParams);
  }

  const onLikeSortHandler = () => {
    const order = sort.split(",")[1];
    searchParams.set("sort", encodeURI("like_count," + (order === "desc" ? "asc" : "desc")));
    setSearchParams(searchParams);
  }

  const onViewsSortHandler = () => {
    const order = sort.split(",")[1];
    searchParams.set("sort", encodeURI("view_count," + (order === "desc" ? "asc" : "desc")));
    setSearchParams(searchParams);
  }

  if (!postPage.content) {
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
                <a>
                  <svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </a>
              </div>
            </th>
            <th scope="col" className="w-12 px-2 py-3 hover:cursor-pointer" onClick={onViewsSortHandler}>
              <div className="flex items-center justify-center">
                조회
                <a>
                  <svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </a>
              </div>
            </th>
            <th scope="col" className="w-12 px-2 py-3 hover:cursor-pointer" onClick={onLikeSortHandler}>
              <div className="flex items-center justify-center">
                추천
                <a>
                  <svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </a>
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
            {
              postPage.content?.map((post, index) => {
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
        <PaginatedItems currentPage={currentPage} pageSize={pageSize} totalItemSize={postPage.total_elements} totalPages={postPage.total_pages}/>
      </div>
    </>
  );
}

export default PostTable;
