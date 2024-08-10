import React, {FC, useEffect, useState} from 'react'
import "./cartPage.css"
import { useAppSelector } from '../../hooks/useAppSelector'
import ErrorPage from '../errorPage/ErrorPage'
import CartPropductItem from '../../components/cartProductItem/CartProductItem'

const CartPage:FC = () => { 

    const {cart} = useAppSelector(state => state.productReducer)

    if(!cart.length) return <ErrorPage message='Cart is empty :(' />

    let total = 0

    return(
        <div className='cart-container'>
            {cart.map((el) => (
                el.discount ? total += el.discount * el.amount : total += el.price * el.amount,
                <CartPropductItem product={el}></CartPropductItem>
            ))}
            <div className='cart-total'>
                <p>Your total will be: <span>{total}</span>$</p>
            </div>
        </div>
    )
}

export default CartPage