import React, {FC, useEffect, useState} from 'react'
import "./cartPage.css"
import { useAppSelector } from '../../hooks/useAppSelector'
import ErrorPage from '../errorPage/ErrorPage'
import CartPropductItem from '../../components/cartProductItem/CartProductItem'
import NavBar from '../../components/navBar/NavBar'

const CartPage:FC = () => { 

    const {cart} = useAppSelector(state => state.productReducer)

    if(!cart.length) return <ErrorPage message='Cart is empty :(' />

    let total = 0

    return(
      <>
        <NavBar />
        <div className='cart-container'>
          <h1>There is {cart.length} items in your cart</h1>
          <div className='cart-container__items'>
              {cart.map(el =>(
              el.discount ? total += el.discount * el.amount : total += el.price * el.amount,
              <CartPropductItem key={el.id} product={el} />
              ))}
              <div className='cart-container__info'>
                <div className='item'><span>Subtotal</span><span>{total}$</span></div>
                <div className='item'><span>Shipping</span><span>20$</span></div>
                <div className='item'><span>Grand total</span><span>{total + 20}$</span></div>
                <p>{total >= 4980 ? 'Congrats! You can have a free shipping' : `Add ${4980 - total}$ more for free shipping`}</p>
                <progress max={5000} value={total}></progress>
                <button>Proceed to checkout</button>
              </div>
          </div>
        </div>
      </>
    )
}

export default CartPage