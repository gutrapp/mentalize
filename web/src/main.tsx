import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ROUTES } from "./routes/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminContextProvider } from "./context/AdminContext";
import { PersonContextProvider } from "./context/PersonContext";
import { ClinicContextProvider } from "./context/ClinicContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <PersonContextProvider>
          <ClinicContextProvider>
            <Routes>
              {ROUTES.map(({ element, route }) => (
                <Route element={element} path={route} />
              ))}
            </Routes>
          </ClinicContextProvider>
        </PersonContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
