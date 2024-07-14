import AuthForm from "./components/authForm/AuthForm";
import AdminPage from "./pages/adminPage/AdminPage";
import MainPage from "./pages/mainPage/MainPage";
import ProductPage from "./pages/productPage/ProductPage";
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
    },
    {
        path: '/product/:id',
        Component: ProductPage
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