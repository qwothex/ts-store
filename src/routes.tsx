import AuthForm from "./components/authForm/AuthForm";

export const publicRoutes = [
    // {path: 'shop', component: }
    {
        path: '/login', 
        Component: AuthForm
    },
    {
        path: '/registration', 
        Component: AuthForm
    }
]