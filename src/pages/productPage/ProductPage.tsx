import {FC, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { addDiscount, getOneProduct } from '../../API/productsAPI/productAPI'
import { productItem } from '../../store/slices/productSlice'
import './productPage.css'
import { DotLoader } from 'react-spinners'
import { addLastView } from '../../API/usersAPI/usersApi'
import { useAppSelector } from '../../hooks/useAppSelector'

const ProductPage:FC = () => {

    const [product, setProduct] = useState<productItem>()
    const [RAM, setRAM] = useState('')
    const [loading, setLoading] = useState(true)

    const {id} = useParams()

    useEffect(() => {
        getOneProduct(Number(id)).then(data => setProduct(data)).then(data => setLoading(false))
    }, [])

    const {user} = useAppSelector(state => state.userReducer)

    if(product) addLastView(user.id!, product)

    if(loading){
        return <DotLoader/>
    }

    const {description, price, title, image, memory, discount} = product!

    const discountClickHandler = () => {
       const price = +prompt('enter new price')!
       addDiscount(Number(id), price)
    }

    const discountPrice = () => {
        return (
        <div>
            <span className='previous-price'>{price}</span><span className='current-price'>{discount}</span>
        </div>)
    }

    return(
        <div className='productPageContainer'>
            <div className='productPageContainer-leftSide'>
                <img src={'http://localhost:5000/' + image} />
            </div>
            <div className='info'>
                <h1 className='title'>{title}</h1>
                { product?.memory ? 
                    <div className='memoryButtons'>
                        {JSON.parse(memory!).map((el:string) => <button onClick={() => setRAM(el)}>{el}</button>)}
                    </div>
                :
                    <></>
                }
                 <p className='description'>{description}</p>
                <div className='buyOptions'>
                   {/* {RAM ? 
                    <p className='price'>{RAM == '128GB' ? price : RAM == '256GB' ? Math.round(Number(price)+ Number(price)*0.1) : Math.round(Number(price)+ Number(price)*0.2)}<span>$</span></p>
                   :
                    <p className='price'>{price}<span>$</span></p> 
                   } */}
                   {
                    discount ? <div><span className='previous-price'>{price}</span><span className='current-price'>{discount}$</span></div> : <p className='price'>{price}<span>$</span></p>
                   }
                    <button className='cart-button'>Add to cart</button>
                    <button className='credit-button'>buy in credit</button>
                    {user.role == 'ADMIN' ? <button onClick={discountClickHandler} className='discount-button'>Add discount</button> : <></>}
                </div>
                <div className='delivery-info'>
                    <p>Delivery</p>
                    <ul>
                        <li>
                            <span>Pick up from our store</span><span>Free</span>
                        </li>
                        <li>
                            <span>Courier delivery</span><span>20$</span>
                        </li>
                        <li>
                            <span>Delivery to the post office</span><span>8-10$</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductPage