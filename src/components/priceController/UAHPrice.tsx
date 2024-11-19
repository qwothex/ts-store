import React, {FC} from "react";

interface priceI {
    price: number
    discount?: number
}

const UAHPrice:FC<priceI> = ({price, discount}) => {
    return(
        <div>
            {discount ? 
                <div><span className='previous-price'>{price * 40}</span><span className='current-price'>{((price - (price * discount/100)) * 40).toFixed()}UAH</span></div> 
            : 
                <p className='price'>{price * 40}<span>UAH</span></p>}
        </div>
    )
}

export default UAHPrice