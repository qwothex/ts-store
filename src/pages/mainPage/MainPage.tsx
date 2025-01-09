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
import { useSearchParams } from 'react-router-dom'
import CardsLoaderContainer from '../../components/cardsLoaderContainer/CardsLoaderContainer'

const MainPage:FC = () => {

    const {products} = useAppSelector(state => state.productReducer)
    const {lastview} = useAppSelector(state => state.productReducer) 

    const { setProducts, sortProducts } = useActions()

    const [loading, setLoading] = useState(true)

    const [currentType, setCurrentType] = useState('')
    const [currentBrand, setCurrentBrand] = useState('')


    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const brand = searchParams.get('brand')
        const type = searchParams.get('type')
        if(brand) setCurrentBrand(brand)
        if(type) setCurrentType(type)
        setLoading(true)
        getAllProducts(type, brand, 30, 1)
            .then(data => setProducts(data))
            .then(() => setLoading(false))
    }, [searchParams])

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
                            <div className='ads ads1'></div>
                        </AdsSlider.Element>

                        <AdsSlider.Element>
                            <div className='ads ads2'></div>
                        </AdsSlider.Element>

                        <AdsSlider.Element>
                            <div className='ads ads3'></div>
                        </AdsSlider.Element>
                    </AdsSlider>
                    {lastview.length ?  <SliderComponent title='Recenly viewed' products={lastview} /> : <></>}
                    {loading ? 
                        <>
                            <CardsLoaderContainer cardsQuantity={3} /> 
                            <CardsLoaderContainer cardsQuantity={3} /> 
                            <CardsLoaderContainer cardsQuantity={3} /> 
                        </>
                    :
                        <>
                            <SliderComponent title='Discounts' products={products.rows.filter(el => typeof el.discount == "number" && el.discount !== 0)} />
                            <SliderComponent title='Laptops' products={products.rows.filter(el => el.type === 'Laptop')} />
                            <SliderComponent title='Phones' products={products.rows.filter(el => el.type === 'Phone')} />
                        </>
                    }
                </div>
            :
            <div>
                 <div className='active-filters'> 
                    { currentBrand && currentType ?
                        <div>
                            <button className='active-filters__button' onClick={() => {
                                setCurrentBrand('')
                                    searchParams.delete('brand')
                                    setSearchParams(searchParams)
                                    
                                }}>{currentBrand}</button> 
                            <button className='active-filters__button' onClick={() => {
                                setCurrentType('')
                                    searchParams.delete('type')
                                    setSearchParams(searchParams)
                                    
                                }}>{currentType}</button> 
                        </div>
                    :
                    currentBrand ? 
                            <button className='active-filters__button' onClick={() => {
                                setCurrentBrand('')
                                searchParams.delete('brand')
                                setSearchParams(searchParams)
                            }}>{currentBrand}</button> 
                    :
                    //currentType
                    <button className='active-filters__button' onClick={() => {
                        setCurrentType('')
                        searchParams.delete('type')
                        setSearchParams(searchParams)
                        
                    }}>{currentType}</button> 
                    }
                    <form>
                        <select onChange={changeSort} name='select'>
                            <option value='select' defaultValue={'selected'} >Sort Products</option>
                            <option value='fromExpensive' >From expensive to cheap</option>
                            <option value='fromCheap'>From cheap to expensive</option>
                        </select>
                    </form>
                </div>
                <h4>{loading ? 'Loading...' : products.count + ' products found'}</h4>
                <div className='items-div'>
                    {loading ? <CardsLoaderContainer cardsQuantity={3} /> : products.rows.length > 0 ? products.rows.map(el => <ProductItem key={el.id} product={el} />) : "No products founded"}
                </div>
            </div>
            }
        </div>
        </NavLayout>
    )
}

export default MainPage