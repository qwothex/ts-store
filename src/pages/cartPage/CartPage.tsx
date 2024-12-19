import {FC, useState} from 'react'
import "./cartPage.css"
import { useAppSelector } from '../../hooks/useAppSelector'
import ErrorPage from '../errorPage/ErrorPage'
import CartPropductItem from '../../components/cartProductItem/CartProductItem'
import { createOrder } from '../../API/ordersAPI/ordersAPI'
import { useActions } from '../../hooks/useActions'
import { truncateUserCart } from '../../API/usersAPI/usersApi'
import ModalWindow from '../../components/adminProductModal/ModalWindow'
import NavLayout from '../../components/navLayout/NavLayout'
import { productItem } from '../../types/types'

const CartPage:FC = () => { 

    const {cart} = useAppSelector(state => state.productReducer)
    const {id} = useAppSelector(state => state.userReducer.user)
    const userCart = useAppSelector(state => state.userReducer.user.cart)

    const [modalState, setModalState] = useState(false)

    const Close = () => setModalState(false)

    const {truncateLocalCart, truncateLocalUserCart} = useActions()

    if(!cart.length && !userCart?.length) return <ErrorPage message='Cart is empty :(' />

    let total = 20 //shipping price

    const proceed = () => {
      createOrder({products: userCart!, total: total < 5000 ? total : total - 20, userId: id!}).then(() => {
        truncateLocalCart() 
        truncateLocalUserCart()
        truncateUserCart(id!)
      }).finally(() => setModalState(true))
    }

    const modalBody = <div> <p>Your order has been placed</p> </div>

    return(
      <NavLayout>
        <ModalWindow 
          visible={modalState}
          title='Your order'
          body={modalBody}
          Close={Close}
          width={600}
        />
        <div className='cart-container'>
          <h1>There is {cart.length} items in your cart</h1>
          <div className='cart-container__items'>
              {cart.map((el: productItem) => (
              el.discount ? total += +((el.price - (el.price * el.discount/100)).toFixed()) * el.amount : total += el.price * el.amount,
              <CartPropductItem key={el.id} product={el} />
              ))}
              <div className='cart-container__info'>
                <div className='item'><span>Subtotal</span><span>{total - 20}$</span></div>
                <div className='item'><span>Shipping</span><span>{total < 5000 ? '20$' : 'Free'}</span></div>
                <div className='item'><span>Grand total</span><span>{total < 5000 ? total : total - 20}$</span></div>
                <p>{total >= 5000 ? 'Congrats! You can have a free shipping' : `Add ${5000 - total}$ more for free shipping`}</p>
                <progress max={5000} value={total}></progress>
                <button onClick={proceed}>Proceed to checkout</button>
              </div>
          </div>
        </div>
      </NavLayout>
    )
}

export default CartPage