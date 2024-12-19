import {FC} from "react";
import './price.css'

interface priceI {
    price: number
    discount: number
    amount?: number
}

const USDPrice:FC<priceI> = ({price, discount, amount}) => {

    const discountPrice:number = +((price - (price * discount/100)).toFixed())

    return(
        <div>
            {discount ? 
                <div className="discount-price-container"><span className='previous-price'>{price * (amount || 1)}</span><span className='current-price'>{discountPrice * (amount || 1)}$</span></div> 
            : 
                <p className='price'>{price * (amount || 1)}<span>$</span></p>}
        </div>
    )
}

export default USDPrice