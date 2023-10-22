import { KeyContextProvider } from "../context/KeyContext";
import { AdminLogin } from "../pages/Admin";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { UserTests } from "../pages/Tests";
import { MbtiTest } from "../pages/Tests/Mbti";

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
  {
    route: "/tests",
    element: (
      <KeyContextProvider>
        <UserTests />
      </KeyContextProvider>
    ),
  },
  {
    route: "/tests/MB",
    element: (
      <KeyContextProvider>
        <MbtiTest />
      </KeyContextProvider>
    ),
  },
];
