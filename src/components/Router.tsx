import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import { publicRoutes } from "../routes";


const Router:FC = () => {
    return(
        <Routes>
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} />
            )}
            <Route path="*" element={<MainPage />}></Route>
        </Routes>
    )
}

export default Router