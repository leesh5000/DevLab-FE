import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import OauthLogin from "./utils/OauthRedirectHandler.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PostingPage from "./pages/PostingPage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import Home from "./pages/Home.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
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
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/oauth/callback/*" element={<OauthLogin/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/users/:id/:nickname" element={<ProfilePage/>}/>
      <Route path="/posts/" element={<Home/>}/>
      <Route path="/posts/:id/:title" element={<PostDetailPage/>}/>
      <Route path="/posting" element={<PostingPage/>}/>
      <Route path="*" element={<Redirecter/>}/>
    </Routes>
  );
}

export default App
