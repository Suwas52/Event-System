import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.scss";
import ThemeContextProvider from "./context/theme.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
);
