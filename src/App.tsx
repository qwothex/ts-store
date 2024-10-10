import React, { FC, useEffect, useState } from 'react';
import Router from './components/Router';
import { check } from './API/usersAPI/usersApi';
import { useActions } from './hooks/useActions';
import {RotateLoader} from 'react-spinners'
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import { UserI } from './types/types';
import { getOneProduct } from './API/productsAPI/productsAPI';
import { productItem } from './store/slices/productSlice';

const App:FC = () => {

  const [loading, setLoading] = useState<boolean>(true)

  const {setCurrentUser, setUserAuth, setCartProducts, addLastViewProduct} = useActions()

  useEffect(() => {
        check().then((data: UserI | null) => {
            if(data){
              setUserAuth(true)
              setCurrentUser(data)
              setCartProducts(data.cart!)
              data.lastview!.map(id => getOneProduct(id).then((res: productItem) => addLastViewProduct(res)))
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
      <Router />
  );
  
}

export default App;
