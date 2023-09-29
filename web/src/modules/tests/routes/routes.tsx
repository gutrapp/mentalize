import { Admin } from "../pages/Admin";
import { Profile } from "../pages/Dashboard/Profile";
import { Result } from "../pages/Dashboard/Result";
import { Results } from "../pages/Dashboard/Results";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Life } from "../pages/Tests/Life";
import { LoveLanguage } from "../pages/Tests/LoveLanguage";
import { Mbti } from "../pages/Tests/Mbti";
import { SelfKnowledge } from "../pages/Tests/SelfKnowledge";

export const TESTS_ROUTES = [
    {
        route: '/',
        element: <Home />
    },
    {
        route: '/login',
        element: <Login />
    },
    {
        route: '/register',
        element: <Register />
    },
    {
        route: '/admin',
        element: <Admin />
    },
    {
        route: '/result',
        element: <Results />
    },
    {
        route: '/result/:id',
        element: <Result />
    },
    {
        route: '/profile/:id',
        element: <Profile />
    },
    {
        route: '/tests/mbti',
        element: <Mbti />
    },
    {
        route: '/tests/life',
        element: <Life />
    },
    {
        route: '/tests/selfknowledge',
        element: <SelfKnowledge />
    },
    {
        route: '/tests/lovelanguage',
        element: <LoveLanguage />
    },
]