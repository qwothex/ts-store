import {FC} from "react";
import './popUp.css'

interface PopUpI {
    text: string
    isSucces: boolean
}

const PopUp:FC<PopUpI> = ({text, isSucces}) => {

    return(
        <div className="popUp-container" style={{borderColor: isSucces ? 'rgb(0, 100, 0)' : 'rgb(130, 0, 0)'}}>
            <p>{text}</p>
        </div>
    )
}

export default PopUp