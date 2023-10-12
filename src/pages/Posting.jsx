import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Editor from "../components/Editor.jsx";
import {write} from "../actions/PostActions.jsx";
import Categories from "../utils/Categories.jsx";

const Posting = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAuth = useSelector((state) => state.userAuthReducer);
  const [postInput, setPostInput] = useState({
    category: "",
    title: "",
    contents: "",
    tags: [],
  });

  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (!userAuth.isLogin) {
      navigate("/login");
      alert("로그인이 필요합니다.");
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

  const onTitleBlur = (e) => {
    if (postInput.category === "" || postInput.category === "none") {
      setErrorMessage(true);
    }
  }

  const onContentsHandler = (e) => {

    setPostInput({
      ...postInput,
      contents: e,
    });
  }

  const onTagHandler = (e) => {

    if (e.target.value.length > 20) {
      alert("태그는 20자 이내로 입력해주세요.");
      e.target.value = e.target.value.substring(0, 20);
      return;
    }

    if (e.key === "Enter" && e.target.value !== "") {

      if (postInput.tags.length >= 5) {
        alert("태그는 최대 5개까지만 지정 가능합니다.");
        return;
      }

      console.log(e.target.value);
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

  const onPost = () => {

    if (postInput.category === "") {
      alert("카테고리를 선택해주세요.");
      return;
    }

    const noWhitespaceTitle = postInput.title.replace(/ /g, "");
    if (noWhitespaceTitle.length < 8 || noWhitespaceTitle.length > 100) {
      alert("제목은 공백을 제외하고 최소 10자, 최대 100자로 입력해야합니다.");
      return;
    }

    if (postInput.contents.replace(/<[^>]*>/g, '').length < 30) {
      alert("내용은 최소 30자 이상 입력해야 합니다.");
      return;
    }

    dispatch(write(postInput, userAuth.accessToken))
      .then(() => {
        navigate("/");
      });

  }

  const onCancel = () => {
    navigate(-1);
  }

  return (
    <div>
      <Header/>
      <Navbar/>
      <div id="border" className="border-2 border-gray-300 rounded p-16 m-16 mb-8">
        <h1 className="text-xl mb-2">게시글 작성</h1>
        <div className="flex">
          <select id="tabs" className="w-20 border-1 border-r-0 border-gray-400" onChange={onCategoryHandler}>
            <option value="none">카테고리</option>
            {
              Object.entries(Categories).map(([key, value]) => {
                return (
                  <option key={key} value={key}>{value}</option>
                );
              })
            }
          </select>
          <input type="text" className="flex-1 border-1 border-gray-400 p-2"
                 placeholder="제목"
                 onChange={onTitleHandler}
                 onBlur={onTitleBlur}/>
        </div>
        {
          errorMessage ?
            <p className="text-sm text-red-600 mt-1">
              게시글 카테고리를 선택해주세요.
            </p> :
            null
        }
        <h1 className="text-xl mt-8 mb-2">내용</h1>
        <Editor onContentHandler={onContentsHandler}/>
        <h1 className="text-xl mt-8 mb-2">태그 입력</h1>
        <input type="text" className="w-full border-1 border-gray-400 p-2" placeholder="제목"
               onKeyUp={onTagHandler}/>
        <p className="text-sm text-blue-600 mt-1">
          태그는 20자 이내로 입력해주세요. 띄어쓰기는 자동으로 하이픈(-)으로 변환됩니다.
        </p>
        {
          postInput.tags.map((tag) => {
            return (
              <button key={tag} className="border-1 bg-sky-100 text-blue-500 p-2 px-3 mr-2 mt-4" onClick={onRemove}>
                {tag}
              </button>
            );
          })
        }
      </div>
      <div className="mx-16 mb-24 mt-0 flex justify-end items-center">
        <button className="ml-6 border-1 p-1 px-3 border-gray-600" onClick={onPost}>
          등록
        </button>
        <button className="ml-6 border-1 p-1 px-3 border-gray-600" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
}

export default Posting;
