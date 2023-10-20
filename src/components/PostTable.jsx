import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getPage} from "../actions/PostActions.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import Categories from "../utils/Categories.jsx";
import {DateConverter} from "../utils/DateConverter.jsx";
import {TagItem} from "./TagItem.jsx";
import PaginatedItems from "../lib/PaginatedItems.jsx";

function PostTable() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const postPage = useSelector(state => state.posts);
  const pageSize = 12;

  useEffect(() => {
    console.log("category : " + searchParams.get("category"));
    console.log("page : " + searchParams.get("page"));
    const category = searchParams.get("category") === "ALL" ? null : searchParams.get("category");
    const currentPage = Math.max(searchParams.get("page") - 1, 0);
    dispatch(getPage(category, currentPage, pageSize, `${sort},${order}`))
  }, [searchParams, sort, order]);

  const onTitleClick = (post) => {
    navigate(`/posts/${encodeURI(post.title)}`, {
      state: {
        id: post.id,
        title: post.title
      }
    });
  };

  const onLikeSortHandler = () => {
    setSort("like_count");
    setOrder(order === "desc" ? "asc" : "desc");
  }

  if (postPage.content === undefined) {
    return (
      <div>
        <h1>
          Loading...
        </h1>
      </div>
    )
  }

  return (
    <>
      <div id="table-container" className="h-[940px]">
        <table className="table-fixed text-sm">
          <thead>
          <tr className="border-1 border-t-0">
            <th className="w-20 text-sm text-gray-600">
              분류
            </th>
            <th className="w-[600px] text-sm text-gray-600">
              제목 & 태그
            </th>
            <th className="w-32 text-sm text-gray-600">
              작성자
            </th>
            <th className="w-24 text-sm text-gray-600">
              작성일
            </th>
            <th className="w-14 text-sm text-gray-600">
              조회
            </th>
            <th className="w-14 text-sm text-gray-600">
              <button onClick={onLikeSortHandler}>
                추천
              </button>
            </th>
          </tr>
          </thead>
          <tbody>
          {
            postPage.content?.map((post, index) => {
              return (
                <tr key={index} className="align-middle text-center border-b-1 border-gray-200">
                  <td id="category" className="">
                    {Categories[post.category]}
                  </td>
                  <td id="title" className="text-start text-base">
                    <button
                      className="my-2 text-sky-700 font-semibold hover:text-sky-500 hover:underline flex items-center"
                      onClick={() => {
                        onTitleClick(post)
                      }}>
                      {post.title}
                      {
                        (post.comment_count !== 0) &&
                        <p className="inline text-xs ml-1">
                          [{post.comment_count}]
                        </p>
                      }
                    </button>
                    <div>
                      {post.tags.map((tag, index) => {
                        return (
                          <TagItem key={index} value={tag}/>
                        )
                      })}
                    </div>
                  </td>
                  <td id="author" className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {post.author}
                  </td>
                  <td id="createdAt">
                    {DateConverter(post.created_at)}
                  </td>
                  <td>
                    999+
                  </td>
                  <td>
                    {post.like_count > 999 ? '999+' : post.like_count}
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
      <div className="my-16">
        <PaginatedItems pageSize={pageSize} totalItemSize={postPage.total_elements}/>
      </div>
    </>
  );
}

export default PostTable;
