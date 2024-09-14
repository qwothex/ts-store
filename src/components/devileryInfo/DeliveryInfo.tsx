import React, {FC} from "react";
import './deliveryInfo.css'

const DevileryInfo:FC = () => {
    return(
        <div className='delivery-info'>
            <p>Delivery</p>
            <ul>
                <li>
                    <span>Pick up from our store</span><span>Free</span>
                </li>
                <li>
                    <span>Courier delivery</span><span>20$</span>
                </li>
                <li>
                    <span>Delivery to the post office</span><span>8-10$</span>
                </li>
            </ul>
        </div>
    )
}

export default DevileryInfo