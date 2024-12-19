import {FC, useEffect, useState} from 'react'
import './orderDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import { changeOrderStatus, getOneOrder } from '../../API/ordersAPI/ordersAPI'
import { CartI, OrderI, productItem } from '../../types/types'
import Loading from '../loading/Loading'
import { getOneProduct } from '../../API/productsAPI/productsAPI'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import NavLayout from '../navLayout/NavLayout'
import { HiArrowSmLeft } from "react-icons/hi";
import UAHPrice from '../priceController/UAHPrice'
import USDPrice from '../priceController/USDPrice'


const OrderDetails:FC = () => {

    const {id} = useParams()
    const {setCurrentOrderProducts} = useActions()

    const navigate = useNavigate()

    const [order, setOrder] = useState<OrderI>({} as OrderI)

    const [loading, setLoading] = useState(true)

    const {currentOrderProducts} = useAppSelector(state => state.orderReducer)
    const {currency} = useAppSelector(state => state.productReducer)

    const date = new Date(order.createdAt).toLocaleDateString('en-EN', {day: 'numeric', month: 'long', year: 'numeric'})

    useEffect(() => {
        if(!currentOrderProducts.length){
            getOneOrder(+id!).then((data: OrderI) => {
                setOrder(data)
                data.products.map((el: CartI) => getOneProduct(el.id).then((data:productItem) => setCurrentOrderProducts({...data, price: el.RAMprice, memory: el.RAMvolume, amount: el.amount})))
            })
        }
        setLoading(false)
    }, [id])

    if(loading) return <Loading />

    return(
        <NavLayout>
            <a className='back-link' href={process.env.PUBLIC_URL + '/orders'}><HiArrowSmLeft size={30}></HiArrowSmLeft>Back to Orders</a>
        <div className='orderDetails-container'>
            <h2>Order details</h2>
            <div className='order-data'>
                <ul>
                    <li>Order number: {order.id}</li>
                    <li>Order status: {order.status}</li>
                    <li>Order date: {date}</li>
                    <li>Order total: {order.total}</li>
                </ul>
            </div>
            <h3>Order items</h3>
            <div className='order-products'>
                {currentOrderProducts.map((el) => {
                    console.log(el)
                    return(
                        <div className='order-product'>
                            <img src={'http://localhost:5000/' + el.image} />
                            <div className='right-side'>
                                <div className="top-side">
                                    <h3 className="title" onClick={() => navigate('/product/' + el.id, {replace: false})}>
                                        {el.memory ? el.title.replace(/(128GB|256GB|512GB|1TB)/, el.memory!) : el.title}
                                    </h3>
                                    <p>{el.description}</p>
                                </div>
                                <div className='bottom-side'>
                                    {currency == 'UAH' ? <UAHPrice price={el.price * el.amount} discount={el.discount}/> : <USDPrice price={el.price * el.amount} discount={el.discount}/>}
                                    <span>{el.amount + ' for ' + el.price + ' each'}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button className='cancel-button' onClick={() => changeOrderStatus(order.id, 'canceled')}>Cancel order</button>
        </div>
        </NavLayout>
    )
}

export default OrderDetails