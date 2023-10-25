import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(encodeURI("/posts?category=ALL&page=1&sort=created_at,desc"));
  }, []);
}

export default Home;
