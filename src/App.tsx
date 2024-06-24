import React, { FC, useEffect, useState } from 'react';
import Router from './components/Router';
import MainPage from './pages/mainPage/MainPage';
import NavBar from './components/navBar/NavBar';
import { check } from './usersAPI/usersApi';
import { useActions } from './hooks/useActions';
import {ClipLoader} from 'react-spinners'
import { useAppSelector } from './hooks/useAppSelector';


const App:FC = () => {

  const [loading, setLoading] = useState<boolean>(true)

  const {setCurrentUser, setUserAuth} = useActions()

  useEffect(() => {
    check().then(data => {
      console.log(data)
      setUserAuth(true)
      setCurrentUser(data)}).finally(() => setLoading(false))
  }, [])

  if(loading) return <ClipLoader />

  return (
    <div style={{width: '100vw'}}>
      <Router />
    </div>
  );
  
}

export default App;
