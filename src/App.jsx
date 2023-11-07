import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import OauthRedirectHandler from "./utils/OauthRedirectHandler.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PostingPage from "./pages/PostingPage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import Home from "./pages/Home.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import {fetchAccessToken} from "./actions/AuthActions.jsx";
import {useDispatch} from "react-redux";
import {Redirecter} from "./pages/Redirecter.jsx";
import {FindIdPage} from "./pages/FindIdPage.jsx";
import {FindPasswordPage} from "./pages/FindPasswordPage.jsx";
import {PrivatePage} from "./pages/PrivatePage.jsx";
import {PolicyPage} from "./pages/PolicyPage.jsx";

export const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccessToken());
  }, []);

  return (
    <Routes>
      <Route path="/oauth/callback/*" element={<OauthRedirectHandler/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/private" element={<PrivatePage/>}/>
      <Route path="/policy" element={<PolicyPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route exact path="/find-id" element={<FindIdPage/>}/>
      <Route exact path="/find-password" element={<FindPasswordPage/>}/>
      <Route path="/users/:id/:nickname" element={<ProfilePage/>}/>
      <Route path="/posts/:id" element={<PostDetailPage/>}/>
      <Route path="/posts/" element={<Home/>}/>
      <Route path="/posting" element={<PostingPage/>}/>
      <Route path="*" element={<Redirecter/>}/>
    </Routes>
  );
}

export default App
