import React, {FC, FunctionComponent, ReactNode} from "react";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";

interface navLayoutI {
    children: ReactNode
}

const NavLayout:FC<navLayoutI> = ({children}) => {
    return(
        <div>
            <NavBar />
             {children}
            <Footer />
        </div>
    )
}

export default NavLayout