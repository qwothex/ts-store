import { FC, useEffect, useState } from 'react';
import Router from './components/Router';
import { check } from './API/usersAPI/usersApi';
import { useActions } from './hooks/useActions';
import {RotateLoader} from 'react-spinners'
import { UserI } from './types/types';
import { getOneProduct } from './API/productsAPI/productsAPI';
import { productItem } from './store/slices/productSlice';
import Loading from './components/loading/Loading';

const App:FC = () => {

  const [loading, setLoading] = useState<boolean>(true)

  const {setCurrentUser, setUserAuth, addLastViewProduct, addProductToCart} = useActions()

  useEffect(() => {
        check().then((data: UserI | null) => {
            if(data){
              setUserAuth(true)
              setCurrentUser(data)
              if(data.lastview?.length)data.lastview.map(id => getOneProduct(id).then((res: productItem) => addLastViewProduct(res)))
              if(data.cart?.length)data.cart.map(id => getOneProduct(id).then((res: productItem) => addProductToCart({...res, amount: 1})))
            }
          }).finally(() => setLoading(false))
  }, [])

  if(loading) return <Loading />

  return (
      <Router />
  );
  
}

export default App;


