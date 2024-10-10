import React, {FC, useEffect, useRef, useState} from 'react'
import './mainPage.css'
import { getAllProducts} from '../../API/productsAPI/productsAPI'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import { RotateLoader } from 'react-spinners'
import SideBar from '../../components/sideBar/SideBar'
import "glider-js/glider.min.css";
import ProductItem from '../../components/productItem/ProductItem'
import SliderComponent from '../../components/sliderComponent/SliderComponent'
import AddSlider from '../../components/addSlider/AddSlider'
import NavLayout from '../../components/navLayout/NavLayout'

const MainPage:FC = () => {

    const {currentBrand, currentType, products} = useAppSelector(state => state.productReducer)
    const {lastview} = useAppSelector(state => state.productReducer) 

    const { setProducts, setCurrentBrand, setCurrentType, sortProducts } = useActions()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getAllProducts(currentType, currentBrand, 30, 1)
        .then(data => setProducts(data))
        .then(() => setLoading(false))
    }, [currentBrand, currentType])

    if(loading){
        return( 
        <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <RotateLoader color='black' />
        </div>
        )
    }

    const changeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        sortProducts(e.target.selectedIndex)
    }

    return(
        <NavLayout>
                <div className='mainPage-container'>
            <SideBar />
            {!currentBrand && !currentType ? 
                <div className='glider-div'>
                    <AddSlider>
                        <div></div>
                        <div></div>
                        <div></div>
                    </AddSlider>
                    {lastview.length > 0 ? <SliderComponent title='Recenly viewed' products={lastview} slidesToScroll={3} slidesToShow={6} /> : <></>}
                    <SliderComponent title='Recomendations' products={products.rows} slidesToScroll={3} slidesToShow={6} />
                </div>
            :
            <div>
                 <div className='active-filters'> 
                    { currentBrand && currentType ?
                        <div>
                            <button className='active-filters__button' onClick={() => setCurrentBrand('')}>{currentBrand}</button> 
                            <button className='active-filters__button' onClick={() => setCurrentType('')}>{currentType}</button> 
                        </div>
                    :
                    currentBrand ? 
                            <button className='active-filters__button' onClick={() => setCurrentBrand('')}>{currentBrand}</button> 
                    :
                    <button className='active-filters__button' onClick={() => setCurrentType('')}>{currentType}</button> 
                    }
                    <form>
                        <select onChange={changeSort} name='select'>
                            <option value='select' defaultValue={'selected'} >Sort Products</option>
                            <option value='fromExpensive' >From expensive to cheap</option>
                            <option value='fromCheap'>From cheap to expensive</option>
                        </select>
                    </form>
                </div>
                <div className='items-div'>
                    {
                        products.rows.length > 0 ? products.rows.map(el => <ProductItem key={el.id} product={el} />) : "No products founded"
                    }
                </div>
            </div>
            }
        </div>
        </NavLayout>
    )
}

export default MainPage