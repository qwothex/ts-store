import React, {FC} from "react";
import './adminModalProduct.css'

interface modalProps {
    visible: boolean
    title: string
    body: React.ReactElement | React.ReactNode | string
    footer: React.ReactElement | React.ReactNode | string
    Close: () => void
}

const AdminProductModal = ({visible, title, body, footer, Close} : modalProps) => {

    if(!visible) return null

    return(
        <div className="modal-container" onClick={Close}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <span className="modal-title">{title}</span><span className="modal-close" onClick={Close}>close</span>
                </div>
                <div className="modal-body">{body}</div>
                <div className="modal-footer">{footer}</div>
            </div>
        </div>
    )
}

export default AdminProductModal