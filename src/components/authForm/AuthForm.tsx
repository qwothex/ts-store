import React, {FC, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { createUser, loginUser } from '../../API/usersAPI/usersApi'
import './authForm.css'
import { CartI, productItem, UserI } from '../../types/types'
import { getOneProduct } from '../../API/productsAPI/productsAPI'
import NavLayout from '../navLayout/NavLayout'
import PopUp from '../pop-upWindow/PopUp'
import { AxiosError } from 'axios'


const AuthForm:FC = () => {

    const { setUserAuth, setCurrentUser, addLastViewProduct, addProductToLocalCart } = useActions()

    const navigate = useNavigate()

    const isLoginPath = window.location.pathname === '/login'

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [popUpStatus, setPopUpStatus] = useState<{show: boolean, success?: boolean, text?: string}>({show: false, success: true, text: 'Something went wrong!'})

    
    const formSubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            let data: UserI;
            if(isLoginPath){
                data = await loginUser(login, password)
            }else{
                data = await createUser(login, password)
            }
            setCurrentUser(data)
            setUserAuth(true)

            if(data.cart?.length)
                data.cart.map((el: CartI) => getOneProduct(el.id)
               .then((res: productItem) => addProductToLocalCart({...res, amount: 1, price: el.RAMprice, memory: el.RAMvolume})))

            if(data.lastview)data.lastview.map(id => getOneProduct(id)
                .then((res: productItem) => addLastViewProduct(res)))

            navigate('/', {replace: false})
        }catch(error: any){
            console.log(error)
            setPopUpStatus({show: true, text: error.response.status == 500 ? 'Wrong username or password' : 'Something went wrong'})
        }
    }

    if(popUpStatus.show){
        setTimeout(() => setPopUpStatus({show: false}), 4000)
    }

    return(
        <NavLayout>
        {popUpStatus.show ? <PopUp text={popUpStatus.text!} isSucces={false} /> : <></>}
        <div className='authPage-container'>
            <form className='authForm' onSubmit={formSubmitHandler}>
                    <h3 style={{margin: '0 0 15px 0'}}>{isLoginPath ? 'Sign in' : 'Sing up'}</h3>
                    <input required placeholder='login' type={'text'} value={login} onChange={(e) => setLogin(e.target.value)}/>
                    <input required placeholder='password' minLength={6} type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span className='policy-input'><input type='checkbox' required />I confirm that i agree with site's Terms of Service and Privacy Policy</span>
                <div>
                    {isLoginPath ? 
                        <div>
                            new here? <NavLink style={{marginLeft: '5px'}} to={'/registration'}>sign up</NavLink>
                        </div>
                        :
                        <div>
                            already have an account? <NavLink style={{marginLeft: '5px'}} to={'/login'}>sign in</NavLink>
                        </div>
                    }
                    <button type='submit'>{isLoginPath ? 'Sign in' : 'Sing up'}</button>
                </div>
            </form>
        </div>
        </NavLayout>
    )
}

export default AuthForm
