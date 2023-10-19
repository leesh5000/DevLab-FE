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
      <Route path="/login" element={<Login/>}/>
      <Route path="/oauth/callback/*" element={<OauthLogin/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route exact path="/posts" element={<Posting/>}/>
      <Route exact path="/posts/:title" element={<PostDetail/>}/>
      <Route exact path="?category=category" element={<Home/>}/>
      <Route exact path="*" element={<Home/>}/>
    </Routes>
  );
}

export default App
