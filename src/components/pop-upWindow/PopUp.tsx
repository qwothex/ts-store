import React, {FC} from "react";
import './popUp.css'

interface PopUpI {
    text: string,
    isSucces: boolean
}

const PopUp:FC<PopUpI> = ({text, isSucces}) => {

    return(
        <div className="popUp-container" style={{backgroundColor: isSucces ? 'rgb(0, 138, 0)' : 'rgb(193, 0, 0)', borderColor: isSucces ? 'rgb(0, 100, 0)' : 'rgb(130, 0, 0)'}}>
            <p>{text}</p>
        </div>
    )
}

export default PopUp