import { AxiosError } from 'axios'
import React, {FC, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { createUser, loginUser } from '../../usersAPI/usersApi'
import './authForm.css'

const AuthForm:FC = () => {

    const { setUserAuth, setCurrentUser } = useActions()

    const navigate = useNavigate()

    const isLoginPath = window.location.pathname === '/login'

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    const formSubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            let data;
            if(isLoginPath){
                data = await loginUser(login, password)
            }else{
                data = await createUser(login, password)
            }
            setCurrentUser(data)
            setUserAuth(true)
            navigate('/', {replace: false})
        }catch(error: any){
            alert(error?.message)
        }
    }

    return(
        <div>
            <form onSubmit={formSubmitHandler}>
                    <h3 style={{margin: '0 0 15px 0'}}>{isLoginPath ? 'Sign in' : 'Sing up'}</h3>
                    <input required placeholder='login' type={'text'} value={login} onChange={(e) => setLogin(e.target.value)}/>
                    <input required placeholder='password' minLength={6} type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
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
    )
}

export default AuthForm