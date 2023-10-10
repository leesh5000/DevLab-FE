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
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers/Index.jsx";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";

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

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, composeWithDevTools(middleware));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CookiesProvider>
      <RouterProvider router={router}/>
    </CookiesProvider>
  </Provider>
)
