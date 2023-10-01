import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ROUTES } from "./routes/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {ROUTES.map(({ element, route }) => (
          <Route element={element} path={route} />
        ))}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
