import React, {FC, useEffect, useRef, useState} from 'react'
import './cartProductItem.css'
import { productItem } from '../../store/slices/productSlice'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { deleteCartProduct } from '../../API/usersAPI/usersApi'
import { useAppSelector } from '../../hooks/useAppSelector'
import Loading from '../loading/Loading'

interface cartProductProps {
    product: productItem
}


const CartProductItem:FC<cartProductProps> = ({product}) => {

    const {changeProductAmount, deleteProductFromCart} = useActions()

    const [amount, setAmount] = useState(product.amount)
    const [loading, setLoading] = useState(false)

    const plusRef = useRef<HTMLButtonElement>(null)
    const minusRef = useRef<HTMLButtonElement>(null)

    const {id, title, image, discount, price} = product

    const userId = useAppSelector(state => state.userReducer.user.id)

    useEffect(() => {
        changeProductAmount({id, newAmount: amount})
    }, [amount])

    const navigate = useNavigate()

    const preventPageReload = (e: any) => {
        e.preventDefault();
        e.returnValue = 'Выполняется запрос, Ваши изменения могут быть потеряны.';
    };

    const lockReload = async (e: any, request: () => any) => {
        const preventPageReload = e.preventDefault();
        window.addEventListener('beforeunload', preventPageReload);

        try {
            const response = await request();
            return response;
        } finally {
            window.removeEventListener('beforeunload', preventPageReload);
        }
    }

    const deleteCartProductHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        await lockReload(e, async () => {
            setLoading(true);
            await deleteCartProduct(product.id, userId!).then(() => setLoading(false))
            deleteProductFromCart(product.id)
        })
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
            <div className='left-side'>
                <div className='left-side__image' 
                    style={{backgroundImage: `url(${'http://localhost:5000/' + image})`}} 
                    onClick={() => navigate('/product/' + id)} 
                />
                <a href={'/product/' + id} className='left-side__title'>
                    {product.memory ? title.replace(/(128GB|256GB|512GB|1TB)/, product.memory!) : title}
                </a>
            </div>
            <div className='right-side'>
                <button onClick={deleteCartProductHandler} className='right-side__delete-button' />
                <div className='amount-price'>
                    <div className='amount'>
                        <button ref={minusRef} onClick={() => setAmount(amount-1)} className='amount-button'>-</button>
                        <div>{amount}</div>
                        <button ref={plusRef} onClick={() => setAmount(amount+1)} className='amount-button'>+</button></div>
                    {
                     discount 
                        ? 
                    <div>
                        <span className='previous-price'>{price * amount}</span>
                        <span className='current-price'>{discount * amount}$</span>
                    </div> 
                        : 
                    <p className='price'>{price*amount}<span>$</span></p>
                    }
                </div>
            </div>
        </div>
    )
}

export default CartProductItem