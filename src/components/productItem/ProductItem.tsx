import React, {FC} from 'react'
import { useNavigate } from 'react-router-dom'
import { productItem } from '../../store/slices/productSlice'
import './productItem.css'
import { useAppSelector } from '../../hooks/useAppSelector'

interface ProductItemProps {
    product: productItem
}

const ProductItem:FC<ProductItemProps> = ({product}) => {

    const navigate = useNavigate()

    const {currency} = useAppSelector(state => state.productReducer)
    
    return(
        <div className='item-card' onClick={() => navigate('/product/' + product.id, {replace: false})} >
            <div className='img-div'>
                <img src={`${process.env.REACT_APP_URL_API + '/' || 'http://localhost:5000/'}${product.image}`} alt="product image" />
            </div>
            <h6><span className='title'>{product.title}</span> {/* product.memory ? product.title.replace(/(128GB|256GB|512GB|1TB)/, product.memory || JSON.parse(product.memory![0]).volume) */} 
            <br /> 
            <span className='brand'>{product.brand}</span></h6>
            {product.discount ? 
                currency == 'USD' ? 
                    <div className='discountPrice-container'><span className='previous-price'>{product.price}</span><span className='current-price'>{product.discount}$</span></div>
                        :
                    <div className='discountPrice-container'><span className='previous-price'>{product.price * 40}</span><span className='current-price'>{product.discount * 40}UAH</span></div>
                :
                    <div className='discountPrice-container'>
                        {currency == 'USD' ? product.price + '$' : product.price*40 + 'UAH'}
                    </div>
            } 
        </div>
    )
}
export default ProductItem