import { FC } from "react"
import { RotateLoader } from "react-spinners"
import './loading.css'


const Loading:FC = () => {
    return(
        <div className="loading-container">
            <RotateLoader color='black' />
        </div>
    )
}

export default Loading