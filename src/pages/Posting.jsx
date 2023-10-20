import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {edit, getDetail, write} from "../actions/PostActions.jsx";
import Categories from "../utils/Categories.jsx";
import Editor from "../components/Editor.jsx";

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

  const onTagHandler = (e) => {

    if (e.target.value.length > 20) {
      e.target.value = e.target.value.substring(0, 20);
      return;
    }

    if (e.key === "Enter" && e.target.value !== "") {

      if (!/^[a-z0-9가-힣\s+\-]*$/.test(e.target.value)) {
        alert("태그는 한글, 영어, 숫자, 공백만 입력 가능합니다.");
        return;
      }

      if (postInput.tags.length >= 5) {
        alert("태그는 최대 5개까지만 지정 가능합니다.");
        return;
      }

      const newTag = e.target.value.replace(/ /g, "-");

      if (!postInput.tags.includes(newTag)) {
        setPostInput({
          ...postInput,
          tags: [...postInput.tags, e.target.value.replace(/ /g, "-")],
        });
      }

      e.target.value = null;
    }
  }

  const onRemove = (e) => {
    setPostInput({
      ...postInput,
      tags: postInput.tags.filter((tag) => {
        return tag !== e.target.innerText;
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
    <div>
      <Header/>
      <Navbar/>
      <div className="font-semibold border-b-2 border-blue-700 pb-1 mt-12 mb-8">
        {mode === "edit" ? "게시글 수정" : "게시글 작성"}
      </div>
      <div className="flex w-full">
        <select id="tabs" className="w-28 border-1 border-gray-400 mr-4" value={postInput.category} onChange={onCategoryHandler}>
          <option value="none">카테고리</option>
          {
            Object.entries(Categories).map(([key, value]) => {
              return (
                <option key={key} value={key}>{value}</option>
              );
            })
          }
        </select>
        <input type="text" className="w-full border-1 border-b-1 border-gray-400 p-2" placeholder="제목"
               value={postInput.title || ""}
               onChange={onTitleHandler} onBlur={onTitleBlur}/>
      </div>
      {
        errorMessage && <div className="text-red-500 text-sm mt-2">카테고리를 선택해주세요.</div>
      }
      <div className="mt-6"></div>
      <Editor contents={postInput?.contents} onContentsHandler={onContentsHandler}/>
      <input type="text" className="w-full border-0 border-b-1 border-gray-400 focus:ring-0 p-2 pl-0 mt-6" placeholder="태그 입력"
             onKeyUp={onTagHandler}/>
      <p className="text-sm text-blue-700 my-1">
        태그는 20자 이내로 입력 가능하며 최대 5개까지 지정 가능합니다.
      </p>
      <div className="h-16">
        {
          postInput.tags?.map((tag) => {
            return (
              <button key={tag} className="border-1 bg-blue-100 hover:bg-blue-300 text-blue-500 p-2 px-3 mr-2 mt-4" onClick={onRemove}>
                {tag}
              </button>
            );
          })
        }
      </div>
      <div className="flex justify-end items-center">
        <button className="mr-6 border-1 border-gray-400 text-white bg-blue-700 hover:bg-blue-800 rounded p-2 px-4" onClick={onPostHandler}>
          등록
        </button>
        <button className="border-1 border-gray-400 text-white bg-blue-700 hover:bg-blue-800 rounded p-2 px-4" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
}

export default Posting;
