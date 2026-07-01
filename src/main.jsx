import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const baseUrl = import.meta.env.BASE_URL;
const configuredBasename = baseUrl === "/" ? "" : baseUrl.replace(/\/$/, "");
const runtimeBasename =
  window.location.pathname === "/leavo" || window.location.pathname.startsWith("/leavo/")
    ? "/leavo"
    : configuredBasename;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={runtimeBasename || undefined}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
