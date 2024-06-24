import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import MainPage from "../pages/mainPage/MainPage";
import { privateRoutes, publicRoutes } from "../routes";


const Router:FC = () => {

    const isAuth = useAppSelector(state => state.userReducer.isUserAuth)

    return(
        <>
        {isAuth 
            ?  
        <Routes>
            {privateRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} />
            )}
            <Route path="/" element={<MainPage />}></Route>
        </Routes>
            : 
        <Routes>
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} />
            )}
            <Route path="/" element={<MainPage />}></Route>
        </Routes>
        }
        </>
    )
}

export default Router