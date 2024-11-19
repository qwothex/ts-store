import {FC} from "react";

interface priceI {
    price: number
    discount?: number
}

const USDPrice:FC<priceI> = ({price, discount}) => {
    return(
        <div>
            {discount ? 
                <div><span className='previous-price'>{price}</span><span className='current-price'>{(price - (price * discount/100)).toFixed()}$</span></div> 
            : 
                <p className='price'>{price}<span>$</span></p>}
        </div>
    )
}

export default USDPrice