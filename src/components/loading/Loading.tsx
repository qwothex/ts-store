import { FC } from "react"
import { RotateLoader } from "react-spinners"
import './loading.css'

interface loadingI {
    width?: string
    height?: string
}

const Loading:FC<loadingI> = ({width, height}) => {
    return(
        <div className="loading-container" style={{width, height}}>
            <RotateLoader color='black' />
        </div>
    )
}

export default Loading