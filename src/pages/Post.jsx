import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Editor from "../components/Editor.jsx";
import {write} from "../actions/PostActions.jsx";

const Post = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAuth = useSelector((state) => state.userAuthReducer);
  const [postInput, setPostInput] = useState({
    category: "",
    title: "",
    contents: "",
    tags: [],
  });

  console.log("postInput: ", postInput);

  useEffect(() => {
    if (!userAuth.isLogin) {
      navigate("/login");
      alert("로그인이 필요합니다.");
    }
  }, [userAuth]);

  const onCategoryHandler = (e) => {
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
      content: e,
    });
  }

  const onTagInputHandler = (e) => {

    if (e.key === "Enter") {

      const newTag = e.target.value.replace(/ /g, "-");

      if (!postInput.tags.includes(newTag)) {
        setPostInput({
          ...postInput,
          tags: [...postInput.tags, e.target.value.replace(/ /g, "-")],
        });
      }

      e.target.value = "";
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

    if (postInput.title.length < 8 || postInput.title.length > 50) {
      alert("제목은 최소 8자, 최대 50자 이상 입력해야합니다.");
      return;
    }

    if (postInput.content.replace(/<[^>]*>/g, '').length < 30) {
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
            <option value="none">탭</option>
            <option value="question">질문</option>
            <option value="information">정보</option>
            <option value="life">질문</option>
          </select>
          <input type="text" className="flex-1 border-1 border-gray-400 p-2" placeholder="제목"
                 onChange={onTitleHandler}/>
        </div>
        <h1 className="text-xl mt-8 mb-2">내용</h1>
        <Editor onContentHandler={onContentsHandler}/>
        <h1 className="text-xl mt-8 mb-2">태그 입력</h1>
        <input type="text" className="w-full border-1 border-gray-400 p-2 mb-2" placeholder="제목"
               onKeyDown={onTagInputHandler}/>
        {
          postInput.tags.map((tag) => {
            return (
              <button key={tag} className="border-1 bg-sky-100 text-blue-500 p-2 px-3 mr-2" onClick={onRemove}>
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

export default Post;
