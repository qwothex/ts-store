import {FC, useEffect, useState} from 'react'
import './orderDetails.css'
import { useParams } from 'react-router-dom'
import { changeOrderStatus, getOneOrder } from '../../API/ordersAPI/ordersAPI'
import { CartI, OrderI } from '../../types/types'
import Loading from '../loading/Loading'
import { getOneProduct } from '../../API/productsAPI/productsAPI'
import { productItem } from '../../store/slices/productSlice'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import ProductItem from '../productItem/ProductItem'
import NavLayout from '../navLayout/NavLayout'

const OrderDetails:FC = () => {

    const {id} = useParams()
    const {setCurrentOrderProducts} = useActions()

    const [order, setOrder] = useState<OrderI>({} as OrderI)

    const [loading, setLoading] = useState(true)

    const {currentOrderProducts} = useAppSelector(state => state.orderReducer)

    const date = new Date(order.createdAt).toLocaleDateString('en-EN', {day: 'numeric', month: 'long', year: 'numeric'})

    useEffect(() => {
        if(!currentOrderProducts.length){
            getOneOrder(+id!).then((data: OrderI) => {
                setOrder(data)
                data.products.map((el: CartI) => getOneProduct(el.id).then((data:productItem) => setCurrentOrderProducts({...data, price: el.RAMprice, memory: el.RAMvolume})))
            })
        }
        setLoading(false)
    }, [])

    if(loading) return <Loading />

    return(
        <NavLayout>
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
                {currentOrderProducts.map(el => <ProductItem product={el} />)}
            </div>
            <button className='cancel-button' onClick={() => changeOrderStatus(order.id, 'canceled')}>Cancel order</button>
        </div>
        </NavLayout>
    )
}

export default OrderDetails