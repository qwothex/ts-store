import React, {FC, useEffect, useRef, useState} from 'react'
import './cartProductItem.css'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { deleteCartProduct } from '../../API/usersAPI/usersApi'
import { useAppSelector } from '../../hooks/useAppSelector'
import Loading from '../loading/Loading'
import USDPrice from '../priceController/USDPrice'
import UAHPrice from '../priceController/UAHPrice'
import { productItem } from '../../types/types'

interface cartProductProps {
    product: productItem
}


const CartProductItem:FC<cartProductProps> = ({product}) => {

    const {changeProductAmount, changeUserProductAmount, deleteProductFromLocalCart} = useActions()

    const [amount, setAmount] = useState(product.amount)
    const [loading, setLoading] = useState(false)

    const plusRef = useRef<HTMLButtonElement>(null)
    const minusRef = useRef<HTMLButtonElement>(null)

    const {id, title, image, discount, price} = product

    const userId = useAppSelector(state => state.userReducer.user.id)
    const {currency} = useAppSelector(state => state.productReducer)

    useEffect(() => {
        changeProductAmount({id, newAmount: amount})
        changeUserProductAmount({id, amount})
    }, [amount])

    const navigate = useNavigate()

    // const preventPageReload = (e: any) => {
    //     e.preventDefault();
    //     e.returnValue = 'Выполняется запрос, Ваши изменения могут быть потеряны.';
    // };

    // const lockReload = async (e: any, request: () => any) => {
    //     const preventPageReload = e.preventDefault();
    //     window.addEventListener('beforeunload', preventPageReload);

    //     try {
    //         const response = await request();
    //         return response;
    //     } finally {
    //         window.removeEventListener('beforeunload', preventPageReload);
    //     }
    // }

    const deleteCartProductHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true);
        await deleteCartProduct(product.id, userId!)
        .then(() => deleteProductFromLocalCart(product.id))
        .finally(() => setLoading(false))
    }

    if(loading){
        return (
            <div className='cartItem-container'>
                <Loading width='100%' height='100%' />
            </div>
        )
    }

    setTimeout(() => amount < 2 ? minusRef.current!.disabled = true : minusRef.current!.disabled = false, 1)
    if(plusRef.current) amount > 8 ? plusRef.current.disabled = true : plusRef.current.disabled = false

    return(
        <div className='cartItem-container'>
            <div className='image' 
                    style={{backgroundImage: `url(${'http://localhost:5000/' + image})`}} 
                    onClick={() => navigate('/product/' + id)} 
            />
            <div className='right-side'>
                <div className='top'>
                    <a href={'/product/' + id} className='right-side__title'>
                        {product.memory ? title.replace(/(128GB|256GB|512GB|1TB)/, product.memory!) : title}
                    </a>
                    <button onClick={deleteCartProductHandler} className='right-side__delete-button' />
                </div>
                <div className='amount-price'>
                    <div className='amount'>
                        <button ref={minusRef} onClick={() => setAmount(amount-1)} className='amount-button'>-</button>
                        <div>{amount}</div>
                        <button ref={plusRef} onClick={() => setAmount(amount+1)} className='amount-button'>+</button></div>
                    {
                        currency == 'USD' ?
                            <USDPrice price={price} discount={discount} amount={amount}/>
                        :
                            <UAHPrice price={price} discount={discount} amount={amount}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default CartProductItem