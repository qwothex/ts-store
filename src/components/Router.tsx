import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { privateRoutes, publicRoutes } from "../routes";
import ErrorPage from "../pages/errorPage/ErrorPage";


const Router:FC = () => {

    const isAuth = useAppSelector(state => state.userReducer.isUserAuth)

    return(
        <>
        {isAuth 
            ?  
        <Routes>
            {privateRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} errorElement={<ErrorPage message="404. Not Found" />}/>
            )}
        </Routes>
            : 
        <Routes>
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} errorElement={<ErrorPage message="404. Not Found" />}/>
            )}
        </Routes>
        }
        </>
    )
}

export default Router