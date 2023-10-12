import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers/Index.jsx";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import App from "./App.jsx";
import {CookiesProvider} from "react-cookie";
import {Provider} from "react-redux";
import ScrollToTop from "./utils/ScrollTop.jsx";

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, composeWithDevTools(middleware));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <ScrollToTop/>
        <App/>
      </BrowserRouter>
    </CookiesProvider>
  </Provider>
);
