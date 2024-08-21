import React, { FC, useEffect, useState } from 'react';
import Router from './components/Router';
import { check } from './API/usersAPI/usersApi';
import { useActions } from './hooks/useActions';
import {RotateLoader} from 'react-spinners'
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import { UserI } from './types/types';


const App:FC = () => {

  const [loading, setLoading] = useState<boolean>(true)

  const {setCurrentUser, setUserAuth, setCartProducts} = useActions()

  useEffect(() => {
        check().then((data: UserI | null) => {
            if(data){
              setUserAuth(true)
              setCurrentUser(data)
              setCartProducts(data.cart!)
            }
          }).finally(() => setLoading(false))
  }, [])

  if(loading){
    return(
      <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <RotateLoader color='black' />
      </div>)
  }

  return (
    <div>
      <NavBar />
      <Router />
      <Footer />
    </div>
  );
  
}

export default App;
