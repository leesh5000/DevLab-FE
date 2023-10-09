import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Login from "./pages/Login.jsx";
import OauthRedirectHandler from "./utils/OauthRedirectHandler.jsx";
import Register from "./pages/Register.jsx";
import {CookiesProvider} from "react-cookie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/oauth/callback/*",
    element: <OauthRedirectHandler/>
  },
  {
    path: "/register",
    element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <RouterProvider router={router}/>
  </CookiesProvider>
)
