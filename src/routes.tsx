import AuthForm from "./components/authForm/AuthForm";
import Admin from "./pages/Admin";
import UserPage from "./pages/userPage/UserPage";

export const publicRoutes = [
    {
        path: '/login', 
        Component: AuthForm
    },
    {
        path: '/registration', 
        Component: AuthForm
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
        Component: Admin
    },
]