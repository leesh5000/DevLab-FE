import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import {persistedReducer} from "./reducers/Index.jsx";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import App from "./App.jsx";
import {CookiesProvider} from "react-cookie";
import {Provider} from "react-redux";
import ScrollToTop from "./utils/ScrollTop.jsx";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {InjectAxiosInterceptor} from "./lib/InjectAxiosInterceptor.jsx";

const middleware = applyMiddleware(thunk);
const store = createStore(persistedReducer, composeWithDevTools(middleware));
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CookiesProvider>
        <BrowserRouter>
          <ScrollToTop/>
          <InjectAxiosInterceptor/>
          <App/>
        </BrowserRouter>
      </CookiesProvider>
    </PersistGate>
  </Provider>
);
