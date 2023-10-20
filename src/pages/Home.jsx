import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/posts?category=ALL&page=1");
  }, []);
}

export default Home;
