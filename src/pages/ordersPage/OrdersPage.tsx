import {ChangeEvent, FC, useEffect, useState} from 'react'
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
import { OrderI } from '../../types/types'

const OrdersPage:FC = () => {

    const {setOrders} = useActions()

    const {orders} = useAppSelector(state => state.orderReducer)
    const {id} = useAppSelector(state => state.userReducer.user)

    const [loading, setLoading] = useState(true)
    const [sort, setSort] = useState<'id <' | 'id >' | 'total <' | 'total >'>('id <')
    const [filter, setFilter] = useState<'in progress' | 'delivered' | 'canceled' | ''>('')

    useEffect(() => {
        getOrders(id!).then((data) => setOrders(data)).finally(() => setLoading(false))
    }, [])

    if(loading) return <Loading />

    const sortExpression = (e: ChangeEvent<HTMLSelectElement>) => {
        switch(e.target.selectedIndex){
            case 0:
                setSort('id <')
                break;
            case 1:
                setSort('id >')
                break;
            case 2:
                setSort('total <')
                break;
            case 3:
                setSort('total >')
                break;
        }
    }

    type Field = 'id' | 'total' 
    type Option = '>' | '<' 

    const sortFn = (sortOption: string) => {
        const field:Field = sort.split(' ')[0] as Field
        const option:Option = sortOption.split(' ')[1] as Option
        return (a: OrderI, b: OrderI) => option == '>' ? a[field] >  b[field] ? 1 : -1 : a[field] <  b[field] ? 1 : -1
    }

    return(
        <NavLayout>
          <div className='ordersPage-container'>
            <div className='ordersPage-container__filters'>
                <ul>
                    <li onClick={() => setFilter('')}>
                        <RiProgress1Line size={30} /> <span>All</span>
                    </li>
                    <li onClick={() => setFilter('in progress')}>
                        <RiProgress1Line size={30} /> <span>In Progress</span>
                    </li>
                    <li onClick={() => setFilter('delivered')}>
                        <MdFileDownloadDone size={30} /> <span>Delivered</span>
                    </li>
                    <li onClick={() => setFilter('canceled')}>
                        <TbLocationCancel size={30} /> <span>Canceled</span>
                    </li>
                </ul>
            </div>
            <div className='ordersPage-container__info'>
                <h2 className='ordersPage-title'>Order history</h2>
                <select name='select' onChange={sortExpression}>
                    <option value={'cheapest'}>Recent</option>
                    <option value={'most expensive'}>Oldest</option>
                    <option value={'recent'}>Most expensive</option>
                    <option value={'oldest'}>Cheapest</option>
                </select>
                <p>view all your ongoing and previous orders here</p>
                {orders.filter(el => filter ? el.status === filter : el.status !== filter).sort(sortFn(sort)).map(el => <OrderItem key={el.id} order={el} />)}
            </div>
          </div>
        </NavLayout>
    )
}

export default OrdersPage
