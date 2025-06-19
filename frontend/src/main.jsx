import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { store } from "./redux/app/store.js";
import { Provider } from "react-redux";
import ScrollToTop from "./routerScrollToTop/ScrollToTop.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import 'flowbite'

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider
    clientId={`${import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}`}
  >
    <Provider store={store}>
      <BrowserRouter>
        {/* <StrictMode> */}
          <ScrollToTop />
          <App />
        {/* </StrictMode> */}
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);
