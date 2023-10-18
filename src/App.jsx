import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import OauthLogin from "./utils/OauthRedirectHandler.jsx";
import Register from "./pages/Register.jsx";
import Posting from "./pages/Posting.jsx";
import PostDetail from "./pages/PostDetail.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/oauth/callback/*" element={<OauthLogin/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/post" element={<Posting/>}/>
      <Route path="/post/:title" element={<PostDetail/>}/>
    </Routes>
  );
}

export default App
