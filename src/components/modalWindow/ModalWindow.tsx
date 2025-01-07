import React, { FC } from "react";
import './modalWindow.css'

interface modalProps {
    visible: boolean
    title: string
    body: React.ReactElement | React.ReactNode | string
    footer?: React.ReactElement | React.ReactNode | string
    Close: () => void
    width?: number | string
    height?: number | string
}

const ModalWindow = ({visible, title, body, footer, Close, width, height} : modalProps) => {

    if(!visible) return null

    return(
        <div className="modal-container" onClick={Close}>
            <div className="modal" style={{width, height}} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <span className="modal-title">{title}</span><span className="modal-close" onClick={Close}>close</span>
                </div>
                <div className="modal-body">{body}</div>
                {footer ? <div className="modal-footer">{footer}</div> : <></>}
            </div>
        </div>
    )
}

export default ModalWindow