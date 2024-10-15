import React, {FC} from "react";
import './errorPage.css'
import { Link } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";

interface ErrorPropsI {
    message: string
}

const ErrorPage:FC<ErrorPropsI> = ({message}) => {
    return(
        <>
        <NavBar/>
          <div className="error-container">
            <div className="error-image" />
            <h1>{message}</h1>
            <Link to="/">Home</Link>
          </div>
        </>
    )
}

export default ErrorPage