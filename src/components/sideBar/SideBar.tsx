import React, {FC, useState} from 'react'
import './sideBar.css'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'

const SideBar:FC = () => {

    const {setCurrentBrand, setCurrentType} = useActions()

    const types = [
        {"name" : "Laptop", "picture" : "../assets/white-square.png"}, 
        {"name" : "Phone", "picture" : "../assets/white-square.png"}, 
        {"name" : "Frige", "picture" : "../assets/white-square.png"},
        {"name" : "PC", "picture" : "../assets/white-square.png"},
        {"name" : "TV", "picture" : "../assets/white-square.png"},
    ]

    const brands = [ "Apple", "Samsung", "Nokia","Asus", "Acer","Xiaomi" ]

    const {currentType} = useAppSelector(state => state.productReducer)
    const {currentBrand} = useAppSelector(state => state.productReducer)

    return(
        <div className='sidebar_container'>
            <h3>Type</h3>
            <ul>
                {types.map(el => 
                    <li key={el.name} onClick={(e) => {
                        currentType == el.name ? setCurrentType("") : setCurrentType(el.name)
                        }} >
                            {el.name}
                    </li>
                )}
            </ul>
            <h3>Brand</h3>
            <ul>
                {brands.map(el => 
                    <li key={el} onClick={(e) => {
                        currentBrand == el ? setCurrentBrand("") : setCurrentBrand(el)
                        }} >
                            {el}
                    </li>
                )}
            </ul>
            <div className='download-links'>
                <h4>Download our apps</h4>
                <div className='store-logos'>
                    <a href='https://www.apple.com/app-store' target='blank' className='appStore'/>
                    <a href='https://play.google.com/store/games' target='blank' className='playMarket'/>
                </div>
            </div>
        </div>
    )
}

export default SideBar