import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import PostTable from "../components/PostTable.jsx";
import {Footer} from "../components/Footer.jsx";

const PostLists = () => {

  return (
    <>
      <Header/>
      <Navbar/>
      <SearchBar/>
      <div className="flex flex-col min-h-screen">
        <PostTable/>
      </div>
      <Footer/>
    </>
  );
}

export default PostLists;
