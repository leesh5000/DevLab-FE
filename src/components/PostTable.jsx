import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPage} from "../actions/PostActions.jsx";
import {useNavigate} from "react-router-dom";
import Categories from "../utils/Categories.jsx";

function PostTable() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postPage = useSelector(state => state.postReducer);
  const pageSize = 12;

  useEffect(() => {
    dispatch(getPage(0, 5, "createdAt,desc"))
  }, [dispatch]);

  const dateConverter = (date) => {
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1;
    const day = localDate.getDate();
    const hours = localDate.getHours();
    const minutes = localDate.getMinutes();
    const today = new Date().getDate();

    if (day === today) {
      return `${hours}:${minutes}`;
    } else {
      return `${year}.${month}.${day}`;
    }
  }

  const onTitleClick = (post) => {
    navigate(`/post/${encodeURI(post.title)}`, {
      state: {
        id: post.id,
        title: post.title
      }
    });
  };

  if (!postPage || !postPage.content) {
    return null;
  }

  return (
    <table className="w-full table-fixed">
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
        postPage.content.map((post, index) => {
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
                <div className="text-sm">
                  {post.tags.map((tag, index) => {
                    return (
                      <button key={index}
                              className="mb-2 text-xs rounded-lg py-1 px-1.5 mr-2 bg-sky-100 text-sky-600 hover:bg-blue-200">
                        {tag}
                      </button>
                    )
                  })}
                </div>
              </td>
              <td id="author" className="overflow-hidden text-ellipsis whitespace-nowrap">
                {post.author}
              </td>
              <td id="createdAt">
                {dateConverter(post.created_at)}
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
