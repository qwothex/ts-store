import React, {FC} from 'react'
import { useNavigate } from 'react-router-dom'
import { productItem } from '../../store/slices/productSlice'
import './productItem.css'
import { useAppSelector } from '../../hooks/useAppSelector'

interface ProductItemProps {
    product: productItem
}

const ProductItem:FC<ProductItemProps> = (props) => {

    const navigate = useNavigate()

    const {currency} = useAppSelector(state => state.productReducer)
    
    return(
        <div className='item-card' onClick={() => navigate('/product/' + props.product.id, {replace: false})} >
            <div className='img-div'>
                <img src={process.env.REACT_APP_URL_API || 'http://localhost:5000/' + props.product.image} alt="product image" />
            </div>
            <h6><span className='title'>{props.product.title}</span> 
            <br /> 
            <span className='brand'>{props.product.brand}</span></h6>
            {props.product.discount ? 
                currency == 'USD' ? 
                    <div className='discountPrice-container'><span className='previous-price'>{props.product.price}</span><span className='current-price'>{props.product.discount}$</span></div>
                        :
                    <div className='discountPrice-container'><span className='previous-price'>{props.product.price * 40}</span><span className='current-price'>{props.product.discount * 40}UAH</span></div>
                :
                    <div className='discountPrice-container'>
                        {currency == 'USD' ? props.product.price + '$' : props.product.price*40 + 'UAH'}
                    </div>
            } 
        </div>
    )
}
export default ProductItem