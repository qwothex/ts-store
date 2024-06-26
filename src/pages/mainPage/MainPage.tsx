import React, {FC, useEffect} from 'react'
import './mainPage.css'
import NavBar from '../../components/navBar/NavBar'
import { getAllProducts } from '../../API/productsAPI/productAPI'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'

const MainPage:FC = () => {

    const products = useAppSelector(state => state.productReducer.products)

    const { setProducts } = useActions()

    useEffect(() => {
        getAllProducts(null, null, 3, 1).then(data => setProducts(data))
    }, [])

    useEffect(() => {
        console.log(products)
    }, [products])

    return(
        <div>
            <NavBar />
        </div>
    )
}

export default MainPage