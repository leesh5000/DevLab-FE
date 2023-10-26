import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Loading} from "../components/Loading.jsx";

export const Redirecter = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/posts")
  }, []);

  return (
    <>
      <Loading/>
    </>
  );
}
