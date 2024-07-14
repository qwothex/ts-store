import React, {FC, useEffect, useState} from 'react'
import './mainPage.css'
import { getAllProducts} from '../../API/productsAPI/productAPI'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import ProductItem from '../../components/productItem/ProductItem'
import { RotateLoader } from 'react-spinners'
import SideBar from '../../components/sideBar/SideBar'
import Glider from 'react-glider'
import "glider-js/glider.min.css";

const MainPage:FC = () => {

    const products = useAppSelector(state => state.productReducer.products)

    const { setProducts } = useActions()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllProducts("", "", 9, 1)
        .then(data => setProducts(data))
        .then(data => console.log(data))
        .then(() => setLoading(false))
    }, [])

    if(loading){
        return( 
        <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <RotateLoader color='white' />
        </div>
        )
    }

    return(
        <div className='mainPage_container'>
            <SideBar />
            <div className='items-div'>
            <Glider
                slidesToShow={3}
                slidesToScroll={1}
                hasArrows
                draggable
            >
               {products.rows.map((el) => <div key={el.id}><ProductItem product={el} /></div>)}
            </Glider>
            </div>
        </div>
    )
}

export default MainPage