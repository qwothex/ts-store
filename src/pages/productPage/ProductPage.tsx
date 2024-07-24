import React, {FC, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getOneProduct } from '../../API/productsAPI/productAPI'
import { productItem } from '../../store/slices/productSlice'
import './productPage.css'

const ProductPage:FC = () => {

    const [product, setProduct] = useState<productItem>()
    const [memory128, setMemory128] = useState<boolean>(false)

    const {id} = useParams()

    useEffect(() => {
        getOneProduct(Number(id)).then(data => setProduct(data))
    }, [])

    return(
        <div className='productPageContainer'>
            <div className='productPageContainer-leftSide'> {/*style={{backgroundImage: `url(${'http://localhost:5000/' + product?.image})`}}*/}
                <img src={'http://localhost:5000/' + product?.image} />
            </div>
            <div className='info'>
                <h1 className='title'>{product?.title}</h1>
                <div className='memoryButtons'>
                    <button onClick={() => setMemory128(true)}>128 GB</button>
                    <button onClick={() => setMemory128(false)}>256 GB</button>
                </div>
                 <p className='description'>{product?.description}</p>
                <div className='buyOptions'>
                    {memory128 ? 
                        <p className='price'>{Math.round(product?.price! - (product?.price!/6.6))}$</p> 
                    :
                        <p className='price'>{product?.price}$</p>
                    }
                    <button className='cart-button'>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage