import React, {useEffect} from "react";
import {Route, Routes, useNavigate, useSearchParams} from "react-router-dom";
import Login from "./pages/Login.jsx";
import OauthLogin from "./utils/OauthRedirectHandler.jsx";
import Register from "./pages/Register.jsx";
import Posting from "./pages/Posting.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import PostLists from "./pages/PostLists.jsx";
import Home from "./pages/Home.jsx";
import {initFlowbite} from "flowbite";

export const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    initFlowbite();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/oauth/callback/*" element={<OauthLogin/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/posts/" element={<PostLists/>}/>
      <Route path="/posts/:title" element={<PostDetail/>}/>
      <Route path="/posting" element={<Posting/>}/>
      <Route path="*" element={<Home/>}/>
    </Routes>
  );
}

export default App
