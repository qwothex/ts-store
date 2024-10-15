import {FC} from 'react'
import './orderItem.css'
import { OrderI } from '../../types/types'

interface orderItemProps {
    order: OrderI
}

const OrderItem:FC<orderItemProps> = ({order}) => {

    const date = new Date(order.createdAt).toLocaleDateString('en-EN', {day: 'numeric', month: 'long', year: 'numeric'})

    return(
        <div className='orderItem-container'>
            <div className="orderItem-container__left-side">
                <h3>Order number: {order.id}</h3>
                <h4>Order status: <span>in Progress</span></h4>
                <h4>Order date: <span>{date}</span></h4>
                <h4>Order total: <span>{order.total}</span></h4>
            </div>
            <div className="orderItem-container__right-side">
                <button>view details</button>
            </div>
        </div>
    )
}

export default OrderItem