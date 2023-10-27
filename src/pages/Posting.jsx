import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {edit, getDetail, write} from "../actions/PostActions.jsx";
import Editor from "../components/Editor.jsx";
import Categories from "../utils/Categories.jsx";

const Posting = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode;

  const userAuth = useSelector((state) => state.auth);
  const postDetails = useSelector((state) => state.posts);
  const [errorMessage, setErrorMessage] = useState(false);
  const [postInput, setPostInput] = useState({
    category: "",
    title: "",
    contents: "",
    tags: [],
  });

  useEffect(() => {
    if (!userAuth.isLogin) {
      navigate("/");
    }
    if (mode === "edit") {
      dispatch(getDetail(location.state.id));
      setPostInput({
        category: postDetails.category,
        title: postDetails.title,
        contents: postDetails.contents,
        tags: postDetails.tags,
      });
      console.log(postInput);
    }
  }, [userAuth]);

  const onCategoryHandler = (e) => {
    if (e.target.value === "none") {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
    setPostInput({
      ...postInput,
      category: e.target.value,
    });
  };

  const onTitleHandler = (e) => {
    setPostInput({
      ...postInput,
      title: e.target.value,
    });
  }

  const onContentsHandler = (e) => {
    setPostInput({
      ...postInput,
      contents: e,
    });
  }

  const onTitleBlur = (e) => {
    if (postInput.category === "" || postInput.category === "none") {
      setErrorMessage(true);
    }
  }

  const onTagInputHandler = (e) => {

    console.log(e.target.value);

    if (e.target.value.length > 20) {
      e.target.value = e.target.value.substring(0, 20);
      return;
    }

    if (e.key === "Enter" && e.target.value !== "") {

      const newTag = e.target.value.replace(/ /g, "-").toLowerCase();

      if (postInput.tags.length >= 5) {
        alert("태그는 최대 5개까지만 지정 가능합니다.");
        return;
      }

      if (!postInput.tags.includes(newTag)) {
        setPostInput({
          ...postInput,
          tags: [...postInput.tags, newTag],
        });
      }

      e.target.value = null;
    }
  }

  const onTagRemoveHandler = (e) => {
    setPostInput({
      ...postInput,
      tags: postInput.tags.filter((tag) => {
        return tag !== e.target.innerText.toLowerCase();
      }),
    });
  }

  const onPostHandler = () => {

    if (postInput.category === "none" || postInput.category === "") {
      alert("카테고리를 선택해주세요.");
      return;
    }

    const noWhitespaceTitle = postInput.title.replace(/ /g, "");
    if (noWhitespaceTitle.length < 8 || noWhitespaceTitle.length > 100) {
      alert("제목은 최소 8자, 최대 100자로 입력해야 합니다.");
      return;
    }

    if (postInput.contents.replace(/<[^>]*>/g, '').length < 20) {
      alert("내용은 최소 20자 이상 입력해야 합니다.");
      return;
    }

    if (mode === "edit") {
      dispatch(edit(location.state.id, postInput, userAuth.accessToken))
        .then(() => {
          navigate(-1);
        });
    } else {
      dispatch(write(postInput, userAuth.accessToken))
        .then(() => {
          navigate("/");
        });
    }
  }

  const onCancel = () => {
    navigate(-1);
  }

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="mt-32">
        <p className="font-semibold text-2xl my-8">
          {mode === "edit" ? "게시글 수정" : "게시글 작성"}
        </p>
        <div className="flex">
          <select id="countries" className="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={onCategoryHandler} value={postInput.category}>
            <option value="none">카테고리</option>
            {
              Object.entries(Categories).map(([key, value]) => {
                return (
                  <option key={key} value={key}>{value}</option>
                );
              })
            }
          </select>
          <input type="text" className="ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="제목을 입력해주세요" value={postInput.title} onChange={onTitleHandler} onBlur={onTitleBlur}/>
        </div>
        {
          errorMessage && <p className="text-red-600 text-sm mt-2">카테고리를 선택해주세요.</p>
        }
        <div className="my-8">
          <Editor contents={postInput?.contents} onContentsHandler={onContentsHandler}/>
        </div>
        <input type="text" className="mt-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="태그 입력" onKeyUp={onTagInputHandler}/>
        <p className="text-sm text-blue-700 mt-2">
          태그는 20자 이내로 입력 가능하며 최대 5개까지 지정 가능합니다.
        </p>
        <div className="h-16">
          {
            postInput.tags?.map((tag) => {
              return (
                <button type="button" key={tag} onClick={onTagRemoveHandler}
                        className="mr-2 mt-2 px-3 py-2 text-sm font-medium text-center text-sky-700 bg-sky-100 rounded-lg hover:bg-sky-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {tag}
                </button>
              );
            })
          }
        </div>
      </div>
      <div className="flex justify-start items-center">
        <button type={"submit"} className="mr-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none"
                onClick={onPostHandler}>
          등록
        </button>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none"
                onClick={onCancel}>
          취소
        </button>
      </div>
    </>
  );
}

export default Posting;
