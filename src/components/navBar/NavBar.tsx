import React, {FC, useRef} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import './navBar.css'

const NavBar:FC = () => {

    const navigate = useNavigate()

    const {setCurrentUser, setUserAuth, setCurrency, truncateLastViewProducts, truncateLocalUserCart, truncateLocalCart} = useActions()

    const dropListEl = useRef<HTMLDivElement>(null)
    const currencyEl = useRef<HTMLInputElement>(null)
    const usd = useRef<HTMLParagraphElement>(null)
    const uah = useRef<HTMLParagraphElement>(null)

    const {user} = useAppSelector(state => state.userReducer)
    const {isUserAuth} = useAppSelector(state => state.userReducer)
    const {currency} = useAppSelector(state => state.productReducer)
    const {cart} = useAppSelector(state => state.productReducer)

    const userInfoClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if(dropListEl.current){
          dropListEl.current.style.display == "block" ? dropListEl.current.style.display = "none" : dropListEl.current.style.display = "block" 
        }
    }

    const logOut = (e: React.MouseEvent<HTMLLIElement>) => {
        localStorage.removeItem('token')
        setUserAuth(false)
        setCurrentUser({})
        truncateLastViewProducts()
        // truncateLocalUserCart()
        truncateLocalCart()
        navigate('/')
    }

    const currencyChange = (e: React.MouseEvent<HTMLInputElement>) => {
        currency == 'USD' ? setCurrency("UAH") : setCurrency("USD")
    }

    if(dropListEl.current){
        dropListEl.current!.style.display = "none"
    }

    return(
        <div className='navBar-container'>
                <NavLink to={'/'} />
            {isUserAuth ? 
                <>
                <div className='rightSide'>
                    <button className='cart' onClick={() => navigate('/cart', {replace: false})}><div className='cart-length'>{cart ? cart.length : 0}</div></button>
                    <div className='userInfo' onClick={userInfoClick}>
                        <div className='profilePicture' style={{backgroundImage: `url(${'http://localhost:5000/' + user.additional?.image})`}} />
                        <span>{user.username}</span>
                    </div>
                </div>
                <div ref={dropListEl} className='dropList'>
                    <ul>
                        {user.role == 'ADMIN' ? 
                        <li onClick={() => navigate('/admin', {replace: false})}>
                            ADMIN PANEL
                        </li> : undefined}
                        <li onClick={() => navigate('/profile', {replace: false})}>
                            Profile
                        </li>
                        <li onClick={() => navigate('/orders', {replace: false})}>
                            Orders
                        </li>
                        <li onClick={logOut}>
                            Log out
                        </li>
                        <li>
                            <p ref={usd} className='usd'>USD</p>
                            <input onClick={currencyChange} ref={currencyEl} type='checkbox' id="money-input"/>
                            <label htmlFor='money-input' className='money'></label>
                            <p ref={uah} className='uah'>UAH</p>
                        </li>
                    </ul>
                </div>
                </>
            :
                <div className='auth'>
                    <button onClick={() => navigate('/login')}>sign in</button>
                    <button onClick={() => navigate('/registration')}>sign up</button>
                </div>
            }
        </div>
    )
}

export default NavBar