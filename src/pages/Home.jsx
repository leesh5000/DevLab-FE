import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {useNavigate} from "react-router-dom";
import PostTable from "../components/PostTable.jsx";

const Home = () => {

  const navigate = useNavigate();

  const goPost = () => {
    navigate('/post');
  }

  return (
    <>
      <Header/>
      <Navbar/>
      <SearchBar/>
      <div id="table-container" className="h-[1024px]">
        <PostTable/>
      </div>
      <div className="h-24 bg-yellow-200">
        <button onClick={goPost}>
          글 쓰기
        </button>
      </div>
    </>
  );
}

export default Home;
