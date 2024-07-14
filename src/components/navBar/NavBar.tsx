import React, {FC, useRef} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import './navBar.css'

const NavBar:FC = () => {

    const navigate = useNavigate()

    const {setCurrentUser, setUserAuth} = useActions()

    const dropListEl = useRef<HTMLDivElement>(null)

    const user = useAppSelector(state => state.userReducer.user)
    const isUserAuth = useAppSelector(state => state.userReducer.isUserAuth)

    const userInfoClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if(dropListEl.current){
          dropListEl.current.style.display == "block" ? dropListEl.current.style.display = "none" : dropListEl.current.style.display = "block" 
        }
    }

    const logOut = (e: React.MouseEvent<HTMLLIElement>) => {
        localStorage.removeItem('token')
        setUserAuth(false)
        setCurrentUser({})
        navigate('/')
    }

    if(dropListEl.current){
        dropListEl.current!.style.display = "none"
    }

    return(
        <div className='container'>
            <NavLink to={'/'}>HOME</NavLink>
            {isUserAuth ? 
                <>
                <div className='userInfo' onClick={userInfoClick}>
                    <div className='profilePicture' />
                    <span>{user.username}</span>
                </div>
                <div ref={dropListEl} className='dropList'>
                    <ul>
                        {user.role == 'ADMIN' ? <li onClick={() => navigate('/admin', {replace: false})}>ADMIN PANEL</li> : undefined}
                        <li onClick={() => navigate('/profile', {replace: false})}>
                            Profile
                        </li>
                        <li onClick={logOut}>
                            Log out
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