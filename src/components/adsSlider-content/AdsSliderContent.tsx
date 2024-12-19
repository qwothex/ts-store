import {FC, useEffect, useState} from 'react'
import './adsSliderContent.css'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useNavigate } from 'react-router-dom'
import ErrorPage from '../../pages/errorPage/ErrorPage'

const AdsSliderContent:FC<{imageUrl:string}> = ({imageUrl}) => {

    // const {products} = useAppSelector(state => state.productReducer)

    // const [product, setProduct] = useState<productItem>()

    // useEffect(() => {
    //     setProduct(products.rows[Math.floor(Math.random() * products.rows.length)])
    // }, [])

    // const navigate = useNavigate()

    return (
        // <div className='ads' onClick={() => navigate('product/' + product?.id)}>
        //     <img src = {'http://localhost:5000/' + product?.image} style={{height: 250}}/>
        //     <div className='product-info'>
        //         <div className='top-side'>
        //             <div>
        //                 <h3>{product?.brand}</h3>
        //                 <h2>{product?.title}</h2>
        //             </div>
        //         </div>
        //         <div className='bottom-side'>
        //             {
        //                 product?.detailedDescription ? 
        //                     <ul>
        //                         {
        //                         Object.values(typeof product.detailedDescription == 'string' ? JSON.parse(product.detailedDescription) : {}).map((el: any) => 
        //                             <li>{el}</li>
        //                         )
        //                         }
        //                     </ul>
        //                 : <></>
        //             }
        //         </div>
        //     </div>
        // </div>
        <></>
    )
}

export default AdsSliderContent