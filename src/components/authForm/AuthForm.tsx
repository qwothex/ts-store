import React, {FC, useState, useEffect} from 'react'
import { NavLink, useActionData, useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { createUser, loginUser } from '../../usersAPI/usersApi'
import './authForm.css'

const AuthForm:FC = () => {

    const {setCurrentUser, setUserAuth} = useActions()

    const navigate = useNavigate()

    const isLoginPath = window.location.pathname === '/login'

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            if(isLoginPath){
                const data = loginUser(login)
                data.then(data => data.data.length < 1 ? alert('user does not exist!') : navigate('/'))
            }else{
                createUser(login, password)
            }
        }catch{
            alert(Error('something goes wrong!'))
        }
        
    }

    console.log(isLoginPath)

    return(
        <div>
            <form onSubmit={formSubmitHandler}>
                    <h3 style={{margin: '0 0 15px 0'}}>{isLoginPath ? 'Sign in' : 'Sing up'}</h3>
                    <input placeholder='login' type={'text'} value={login} onChange={(e) => setLogin(e.target.value)}/>
                    <input placeholder='password' type={'text'} value={password} onChange={(e) => setPassword(e.target.value)} />
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