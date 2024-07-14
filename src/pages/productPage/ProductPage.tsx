import React, {FC, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getOneProduct } from '../../API/productsAPI/productAPI'
import { productItem } from '../../store/slices/productSlice'
import './productPage.css'

const ProductPage:FC = () => {

    const [product, setProduct] = useState<productItem>()
    const {id} = useParams()

    useEffect(() => {
        getOneProduct(Number(id)).then(data => setProduct(data))
    }, [])

    return(
        <div className='productPageContainer'>
            <img src={'http://localhost:5000/' + product?.image} />
            <div>
                <p>{product?.title}</p>
                <p>{product?.description}</p>
                <p>{product?.price}</p>
                <p>{product?.brand}</p>
            </div>
        </div>
    )
}

export default ProductPage