import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPage} from "../actions/PostActions.jsx";
import {useNavigate} from "react-router-dom";
import Categories from "../utils/Categories.jsx";
import {DateConverter} from "../utils/DateConverter.jsx";
import {TagItem} from "./TagItem.jsx";

function PostTable() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postPage = useSelector(state => state.postReducer);
  const pageSize = 12;

  useEffect(() => {
    dispatch(getPage(0, 5, "createdAt,desc"))
  }, [dispatch]);

  const onTitleClick = (post) => {
    navigate(`/post/${encodeURI(post.title)}`, {
      state: {
        id: post.id,
        title: post.title
      }
    });
  };

  return (
    <table className="table-fixed">
      <thead>
      <tr className="border-1 border-t-0">
        <th className="w-20">
          분류
        </th>
        <th className="w-[600px]">
          제목 & 태그
        </th>
        <th className="w-32">
          작성자
        </th>
        <th className="w-24">
          작성일
        </th>
        <th className="w-14">
          조회
        </th>
        <th className="w-14">
          추천
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
              <td id="title" className="text-start">
                <button className="my-2 text-sky-700 font-semibold hover:text-sky-400 hover:underline"
                        onClick={() => {
                          onTitleClick(post)
                        }}>
                  {post.title}
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
  );
}

export default PostTable;
