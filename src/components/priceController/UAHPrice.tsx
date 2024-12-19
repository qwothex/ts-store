import React, {FC} from "react";
import './price.css'

interface priceI {
    price: number
    discount: number
    amount?: number
}

const UAHPrice:FC<priceI> = ({price, discount, amount}) => {

    const discountPrice:number = +(((price - (price * discount/100)) * 40).toFixed())

    return(
        <div>
            {discount ? 
                <div><span className='previous-price'>{price * 40 * (amount || 1)}</span><span className='current-price'>{discountPrice * (amount || 1)}₴</span></div> 
            : 
                <p className='price'>{price * 40 * (amount || 1)}<span>₴</span></p>}
        </div>
    )
}

export default UAHPrice