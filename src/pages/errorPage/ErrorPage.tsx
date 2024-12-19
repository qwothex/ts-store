import {FC} from "react";
import './errorPage.css'
import { Link } from "react-router-dom";
import NavLayout from "../../components/navLayout/NavLayout";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";

interface ErrorPropsI {
    message: string
}

const ErrorPage:FC<ErrorPropsI> = ({message}) => {
    return(
        <>
        <NavBar />
          <div className="error-container">
            <div className="error-image" />
            <h1>{message}</h1>
            <p>If you think this is an error, please <a href="#contact">contact us</a></p>
            <Link to="/">Home</Link>
          </div>
        <Footer />
        </>
    )
}

export default ErrorPage