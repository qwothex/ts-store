import React, {FC, useEffect, useState} from 'react'
import './mainPage.css'
import { getAllProducts} from '../../API/productsAPI/productsAPI'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import SideBar from '../../components/sideBar/SideBar'
import "glider-js/glider.min.css";
import ProductItem from '../../components/productItem/ProductItem'
import SliderComponent from '../../components/sliderComponent/SliderComponent'
import {AdsSlider} from '../../components/adsSlider/AdsSlider'
import NavLayout from '../../components/navLayout/NavLayout'
import Loading from '../../components/loading/Loading'
import AdsSliderContent from '../../components/adsSlider-content/AdsSliderContent'

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

    if(loading) return <Loading />

    const changeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        sortProducts(e.target.selectedIndex)
    }

    return(
        <NavLayout>
                <div className='mainPage-container'>
            <SideBar />
            {!currentBrand && !currentType ? 
                <div className='main-content'>
                    <AdsSlider>
                        <AdsSlider.Element>
                            {/* <AdsSliderContent imageUrl='http://localhost:3000/static/media/iphone16-advertising-2.34949fb7c7bbdf62f33e.jpg'/> */}
                            <div className='ads ads3'></div>
                        </AdsSlider.Element>

                        <AdsSlider.Element>
                            {/* <AdsSliderContent imageUrl='http://localhost:3000/static/media/flip-advertising.de816cdfc1fdfc36b07d.png'/> */}
                            <div className='ads ads2'></div>
                        </AdsSlider.Element>

                        <AdsSlider.Element>
                            {/* <AdsSliderContent imageUrl='http://localhost:3000/static/media/iphone16-advertising.e997b6c2be6bafeaeb1e.jpg'/> */}
                            <div className='ads ads1'></div>
                        </AdsSlider.Element>
                    </AdsSlider>
                    {lastview.length > 0 ? <SliderComponent title='Recenly viewed' products={lastview} slidesToShow={6} /> : <></>}
                    <SliderComponent title='Discounts' products={products.rows.filter(el => typeof el.discount == "number" && el.discount !== 0)} slidesToShow={6} />
                    <SliderComponent title='Laptops' products={products.rows.filter(el => el.type === 'Laptop')} slidesToShow={6} />
                    <SliderComponent title='Phones' products={products.rows.filter(el => el.type === 'Phone')} slidesToShow={6} />
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
                    //currentType
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