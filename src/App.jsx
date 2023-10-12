import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import OauthLogin from "./utils/OauthRedirectHandler.jsx";
import Register from "./pages/Register.jsx";
import Post from "./pages/Post.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/oauth/callback/*" element={<OauthLogin/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/post" element={<Post/>}/>
    </Routes>
  );
}

export default App
