import { AdminContextProvider } from "../../../context/AdminContext";
import { PersonContextProvider } from "../../../context/PersonContext";
import { Admin } from "../pages/Admin";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";

export const TESTS_ROUTES = [
  {
    route: "/",
    element: (
      <PersonContextProvider>
        <Home />
      </PersonContextProvider>
    ),
  },
  {
    route: "/register",
    element: (
      <PersonContextProvider>
        <Register />
      </PersonContextProvider>
    ),
  },
  {
    route: "/admin",
    element: (
      <AdminContextProvider>
        <Admin />
      </AdminContextProvider>
    ),
  },
];
