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

    const brands = [
        {"name" : "Apple", "picture" : "../assets/white-square.png"}, 
        {"name" : "Samsung", "picture" : "../assets/white-square.png"}, 
        {"name" : "Nokia", "picture" : "../assets/white-square.png"},
        {"name" : "Asus", "picture" : "../assets/white-square.png"},
        {"name" : "ARTLINE", "picture" : "../assets/white-square.png"},
        {"name" : "Xiaomi", "picture" : "../assets/white-square.png"},
    ]

    const {currentType} = useAppSelector(state => state.productReducer)
    const {currentBrand} = useAppSelector(state => state.productReducer)

    return(
        <div className='sidebar_container'>
            <ul>
                {types.map(el => 
                    <li key={el.name} onClick={(e) => {
                        currentType == el.name ? setCurrentType("") : setCurrentType(el.name)
                        }} >
                            {el.name}
                    </li>
                )}
            </ul>
            <ul>
                {brands.map(el => 
                    <li key={el.name} onClick={(e) => {
                        currentBrand == el.name ? setCurrentBrand("") : setCurrentBrand(el.name)
                        }} >
                            {el.name}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default SideBar