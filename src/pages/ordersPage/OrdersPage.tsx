import React, {FC, useEffect, useState} from 'react'
import './ordersPage.css'
import NavLayout from '../../components/navLayout/NavLayout'
import { getOrders } from '../../API/ordersAPI/ordersAPI'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import Loading from '../../components/loading/Loading'
import OrderItem from '../../components/orderItem/OrderItem'
import { RiProgress1Line } from "react-icons/ri";
import { MdFileDownloadDone } from "react-icons/md";
import { TbLocationCancel } from "react-icons/tb";

const OrdersPage:FC = () => {

    const {setOrders} = useActions()

    const {orders} = useAppSelector(state => state.orderReducer)
    const {id} = useAppSelector(state => state.userReducer.user)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getOrders(id!).then((data) => setOrders(data!)).finally(() => setLoading(false))
    }, [])

    console.log(orders)

    if(loading) return <Loading />

    return(
        <NavLayout>
          <div className='ordersPage-container'>
            <div className='ordersPage-container__filters'>
                {/* <select>
                    <option>Last Month</option>
                    <option>Past 2 months</option>
                    <option>Past 4 months</option>
                    <option>Past 6 months</option>
                </select> */}
                <ul>
                    <li>
                        <RiProgress1Line size={30} /> <span>In Progress</span>
                    </li>
                    <li>
                        <MdFileDownloadDone size={30} /> <span>Delivered</span>
                    </li>
                    <li>
                        <TbLocationCancel size={30} /> <span>Canceled</span>
                    </li>
                </ul>
            </div>
            <div className='ordersPage-container__info'>
                <h2 className='ordersPage-container__info__title'>Order history</h2>
                <p>view all your ongoing and previous orders here</p>
                {orders.map(el => <OrderItem order={el} />)}
            </div>
          </div>
        </NavLayout>
    )
}

export default OrdersPage
