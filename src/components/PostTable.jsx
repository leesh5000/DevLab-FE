import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getPage} from "../actions/PostActions.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import Categories from "../utils/Categories.jsx";
import {DateConverter} from "../utils/DateConverter.jsx";
import PaginatedItems from "../lib/PaginatedItems.jsx";
import {Loading} from "./Loading.jsx";
import {TagItem} from "./TagItem.jsx";

function PostTable() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAuth = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const postPage = useSelector(state => state.posts);
  const pageSize = 20;
  const category = searchParams.get("category") === "ALL" ? null : searchParams.get("category");
  const currentPage = Math.max(searchParams.get("page") - 1, 0);
  const keyword = searchParams.get("keyword");

  const onPostingHandler = () => {

    if (!userAuth.isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    navigate("/posting", {
      state: {
        mode: "write",
      },
    });
  }

  useEffect(() => {
    const pageInfo = {
      page: currentPage,
      size: pageSize,
      sort: `${sort},${order}`,
    }

    dispatch(getPage(category, pageInfo, keyword));
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

  if (!postPage.content) {
    return (
      <Loading/>
    )
  }

  return (
    <>
      <div className="relative">
        <table className="w-full text-sm text-left text-gray-500 table-fixed">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 ">
          <tr className="text-center">
            <th scope="col" className="w-10 px-3 py-3">
              분류
            </th>
            <th scope="col" className="w-[460px] px-3 py-3">
              제목 & 태그
            </th>
            <th scope="col" className="w-20 px-2 py-3">
              작성자
            </th>
            <th scope="col" className="w-20 px-2 py-3">
              작성일
            </th>
            <th scope="col" className="w-12 px-2 py-3">
              조회
            </th>
            <th scope="col" className="w-12 px-2 py-3 hover:cursor-pointer" onClick={onLikeSortHandler}>
              추천
            </th>
          </tr>
          </thead>
          <tbody>
            {
              postPage.content?.map((post, index) => {
                return (
                  <tr key={index} className="bg-white border-b">
                    <td scope="row" className="text-center w-10 px-2 py-3">
                      <strong className="font-semibold">{Categories[post.category]}</strong>
                    </td>
                    <td scope="row" className="px-3 py-3 h-20">
                      <strong className="text-sky-700 hover:text-sky-500 hover:underline hover:cursor-pointer" onClick={() => onTitleClick(post)}>
                        {post.title}
                        {
                          (post.comment_count !== 0) &&
                          <p className="inline text-xs ml-1">
                            [{post.comment_count}]
                          </p>
                        }
                      </strong>
                      <div className="block">
                        {post.tags.map((tag, index) => {
                          return (
                            <TagItem key={index} value={tag}/>
                          )
                        })}
                      </div>
                    </td>
                    <td scope="row"
                        className="text-center w-20 px-2 py-3 text-ellipsis whitespace-nowrap overflow-hidden">
                      {post.author}
                    </td>
                    <td scope="row" className="text-center w-20 px-2 py-3">
                      {DateConverter(post.created_at)}
                    </td>
                    <td scope="row" className="text-center w-12 px-2 py-3">
                      14
                    </td>
                    <td scope="row" className="text-center w-12 px-2 py-3">
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
        <PaginatedItems currentPage={currentPage} pageSize={pageSize} totalItemSize={postPage.total_elements}/>
      </div>
    </>
  );
}

export default PostTable;
