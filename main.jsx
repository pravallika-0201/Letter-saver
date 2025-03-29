import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="73822207260-13dgkpa7n2ir219jejsp2hldir5eprla.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
