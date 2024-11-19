import React, {FC} from 'react'
import { useNavigate } from 'react-router-dom'
import { productItem } from '../../store/slices/productSlice'
import './productItem.css'
import { useAppSelector } from '../../hooks/useAppSelector'
import USDPrice from '../priceController/USDPrice'
import UAHPrice from '../priceController/UAHPrice'

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
                    <USDPrice price={product.price} discount={product.discount} />
                        :
                    <UAHPrice price={product.price} discount={product.discount} />
                :
                    <div className='price-container'>
                        {currency == 'USD' ? product.price + '$' : product.price*40 + 'UAH'}
                    </div>
            } 
        </div>
    )
}
export default ProductItem