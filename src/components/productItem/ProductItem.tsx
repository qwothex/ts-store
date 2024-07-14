import React, {FC} from 'react'
import { useNavigate } from 'react-router-dom'
import { productItem } from '../../store/slices/productSlice'
import './productItem.css'

interface ProductItemProps {
    product: productItem
}

const ProductItem:FC<ProductItemProps> = (props) => {

    const navigate = useNavigate()
    
    return(
        <div className='item-card' onClick={() => navigate('/product/' + props.product.id, {replace: false})} >
            <img src={process.env.REACT_APP_URL_API || 'http://localhost:5000/' + props.product.image} alt="product image" />
            <h6><span className='title'>{props.product.title}</span> <br /> <span className='brand'>{props.product.brand}</span></h6>
            <p>{props.product.price + '$'}</p>
        </div>
    )
}

export default ProductItem