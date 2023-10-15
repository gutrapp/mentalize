import { AdminLogin } from "../pages/Admin";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const TESTS_ROUTES = [
  {
    route: "/",
    element: <Home />,
  },
  {
    route: "/register",
    element: <Register />,
  },
  {
    route: "/admin",
    element: <AdminLogin />,
  },
  {
    route: "/login",
    element: <Login />,
  },
];
