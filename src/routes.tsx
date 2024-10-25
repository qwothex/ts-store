import AuthForm from "./components/authForm/AuthForm";
import ContactForm from "./components/contactForm/ContactForm";
import OrderDetails from "./components/orderDetails/OrderDetails";
import AdminPage from "./pages/adminPage/AdminPage";
import CartPage from "./pages/cartPage/CartPage";
import FAQPage from "./pages/FAQPage/FAQPage";
import MainPage from "./pages/mainPage/MainPage";
import OrdersPage from "./pages/ordersPage/OrdersPage";
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
    },
    {
        path: '/about',
        Component: MainPage
    },
    {
        path: '/FAQ',
        Component: FAQPage
    },
    {
        path: '/contact',
        Component: ContactForm
    },
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
    {
        path: '/cart',
        Component: CartPage
    },
    {
        path: '/orders',
        Component: OrdersPage
    },
    {
        path: '/orders/:id',
        Component: OrderDetails
    }
]