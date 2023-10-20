import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import PostTable from "../components/PostTable.jsx";

const PostLists = () => {

  const navigate = useNavigate();
  const userAuth = useSelector(state => state.auth);

  const onPostingHandler = () => {
    if (!userAuth.isLogin) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    navigate('/posting');
  }

  return (
    <>
      <Header/>
      <Navbar/>
      <SearchBar/>
      <PostTable/>
      <div className="h-24 bg-yellow-200">
        <button onClick={onPostingHandler}>
          글 쓰기
        </button>
      </div>
    </>
  );
}

export default PostLists;