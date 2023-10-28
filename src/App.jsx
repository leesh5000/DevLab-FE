import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import OauthLogin from "./utils/OauthRedirectHandler.jsx";
import Register from "./pages/Register.jsx";
import Posting from "./pages/Posting.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import {fetchAccessToken} from "./actions/AuthActions.jsx";
import {useDispatch} from "react-redux";
import {Redirecter} from "./pages/Redirecter.jsx";

export const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccessToken());
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/oauth/callback/*" element={<OauthLogin/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/users/:id/:nickname" element={<Profile/>}/>
      <Route path="/posts/" element={<Home/>}/>
      <Route path="/posts/:id/:title" element={<PostDetail/>}/>
      <Route path="/posting" element={<Posting/>}/>
      <Route path="*" element={<Redirecter/>}/>
    </Routes>
  );
}

export default App
