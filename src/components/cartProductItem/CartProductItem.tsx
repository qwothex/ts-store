import React, {FC, useEffect, useRef, useState} from 'react'
import './cartProductItem.css'
import { productItem } from '../../store/slices/productSlice'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { deleteCartProduct } from '../../API/usersAPI/usersApi'
import { useAppSelector } from '../../hooks/useAppSelector'

interface cartProductProps {
    product: productItem
}


const CartProductItem:FC<cartProductProps> = ({product}) => {

    const {changeProductAmount, deleteProductFromCart} = useActions()

    console.log(product)

    const [amount, setAmount] = useState(product.amount)

    const plusRef = useRef<HTMLButtonElement>(null)
    const minusRef = useRef<HTMLButtonElement>(null)

    const {id, title, image, discount, price} = product

    const {user} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        changeProductAmount({id, newAmount: amount})
        console.log(amount)
    }, [amount])

    const navigate = useNavigate()

    const deleteCartProductHandler = () => {
        deleteCartProduct(product.id, user.id!)
        deleteProductFromCart(product.id)
    }

    setTimeout(() => amount < 2 ? minusRef.current!.disabled = true : minusRef.current!.disabled = false, 1)
    if(plusRef.current) amount > 8 ? plusRef.current.disabled = true : plusRef.current.disabled = false

    return(
        <div className='cartItem-container'>
        <div className='left-side'>
                <div className='left-side__image' style={{backgroundImage: `url(${'http://localhost:5000/' + image})`}} onClick={() => navigate('/product/' + id)} />
                <a href={'/product/' + id} className='left-side__title'>{title}</a>
        </div>
        <div className='right-side'>
            <button onClick={deleteCartProductHandler} className='right-side__delete-button' />
            <div className='amount-price'>
                <div className='amount'><button ref={minusRef} onClick={() => setAmount(amount-1)} className='amount-button'>-</button><div>{amount}</div><button ref={plusRef} onClick={() => setAmount(amount+1)} className='amount-button'>+</button></div>
            {
                discount ? <div><span className='previous-price'>{price * amount}</span><span className='current-price'>{discount * amount}$</span></div> : <p className='price'>{price*amount}<span>$</span></p>
            }
            </div>
        </div>
    </div>
    )
}

export default CartProductItem