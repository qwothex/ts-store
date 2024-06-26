import AuthForm from "./components/authForm/AuthForm";
import AdminPage from "./pages/adminPage/AdminPage";
import MainPage from "./pages/mainPage/MainPage";
import UserPage from "./pages/userPage/UserPage";

export const publicRoutes = [
    {
        path: '/login', 
        Component: AuthForm
    },
    {
        path: '/registration', 
        Component: AuthForm
    },
    {
        path: '/',
        Component: MainPage
    }
]

export const privateRoutes = [
    ...publicRoutes,
    {
        path: '/profile',
        Component: UserPage
    },
    {
        path: '/admin',
        Component: AdminPage
    },
]