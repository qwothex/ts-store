import React, {FC, useEffect, useState} from 'react'
import './mainPage.css'
import { getAllProducts} from '../../API/productsAPI/productAPI'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import { RotateLoader } from 'react-spinners'
import SideBar from '../../components/sideBar/SideBar'
import "glider-js/glider.min.css";
import ProductList from '../../components/productList/ProductList'
import ProductItem from '../../components/productItem/ProductItem'

const MainPage:FC = () => {

    const {currentBrand, currentType, products} = useAppSelector(state => state.productReducer)
    const {user} = useAppSelector(state => state.userReducer)

    const { setProducts, setCurrentBrand, setCurrentType } = useActions()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllProducts(currentType, currentBrand, 20, 1)
        .then(data => setProducts(data))
        .then(data => console.log(data))
        .then(() => setLoading(false))
    }, [currentBrand, currentType])

    if(loading){
        return( 
        <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <RotateLoader color='black' />
        </div>
        )
    }

    return(
        <div className='mainPage-container'>
            <SideBar />
            {!currentBrand && !currentType ? 
                <div className='glider-div'>
                    <ProductList />
                </div>
            :
            <div>
                 <div className='active-filters'> 
                    { currentBrand && currentType ?
                        <div>
                            <button onClick={() => setCurrentBrand('')}>{currentBrand}</button> 
                            <button onClick={() => setCurrentType('')}>{currentType}</button> 
                        </div>
                    :
                    currentBrand ? 
                            <button onClick={() => setCurrentBrand('')}>{currentBrand}</button> 
                    :
                    <button onClick={() => setCurrentType('')}>{currentType}</button> 
                    }
                </div>
                <div className='items-div'>
                    {products.rows.length > 0 ? products.rows.map(el => <ProductItem product={el} />) : "No products founded"}
                </div>
            </div>
            }
        </div>
    )
}

export default MainPage