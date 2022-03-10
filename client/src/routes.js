import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import RegistrationPage from "./pages/RegistrationPage";

export const routes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage
    },
]