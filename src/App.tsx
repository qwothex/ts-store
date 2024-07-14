import React, { FC, useEffect, useState } from 'react';
import Router from './components/Router';
import { check } from './API/usersAPI/usersApi';
import { useActions } from './hooks/useActions';
import {RotateLoader} from 'react-spinners'
import NavBar from './components/navBar/NavBar';


const App:FC = () => {

  const [loading, setLoading] = useState<boolean>(true)

  const {setCurrentUser, setUserAuth} = useActions()

  useEffect(() => {
      check().then((data) => {
        console.log(data)
        setUserAuth(true)
        setCurrentUser(data)}).finally(() => setLoading(false))
  }, [])

  if(loading){
    return(
      <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <RotateLoader color='white' />
      </div>)
  }

  return (
    <div style={{width: '100vw'}}>
      <NavBar />
      <Router />
    </div>
  );
  
}

export default App;
