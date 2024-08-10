import React, {FC} from "react";
import './errorPage.css'

interface ErrorPropsI {
    message: string
}

const ErrorPage:FC<ErrorPropsI> = ({message}) => {
    return(
        <div className="error-container">
            <div className="error-image" />
            <h1>{message}</h1>
        </div>
    )
}

export default ErrorPage