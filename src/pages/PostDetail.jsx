import {useLocation} from "react-router-dom";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDetail} from "../actions/PostActions.jsx";

const PostDetail = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const postDetails = useSelector(state => state.postReducer);

  const id = location.state.id;

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  return (
    <>
      <Header/>
      <Navbar/>
      <h1 className="text-xl mt-16 mb-8">
        {postDetails.title}
      </h1>
      <div id="contents" className="mb-8">
        {postDetails.contents}
      </div>
    </>
  )
}

export default PostDetail;
