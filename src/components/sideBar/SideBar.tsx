import {FC} from 'react'
import './sideBar.css'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const SideBar:FC = () => {

    const {setCurrentBrand, setCurrentType} = useActions()

    const types = [
        {"name" : "Laptop", "picture" : "../assets/white-square.png"}, 
        {"name" : "Phone", "picture" : "../assets/white-square.png"},  
        {"name" : "PC", "picture" : "../assets/white-square.png"},
        {"name" : "TV", "picture" : "../assets/white-square.png"},
    ]

    const brands = [ "Apple", "Samsung","Asus", "Acer","Xiaomi" ]

    const {currentType} = useAppSelector(state => state.productReducer)
    const {currentBrand} = useAppSelector(state => state.productReducer)

    return(
        <div className='sidebar-container'>
            <input type='checkbox' id='burger-checkbox' className='burger-checkbox'/>
            <label htmlFor="burger-checkbox" className='burger-label'></label>

            <div className='sidebar-content'>
            <h3>Type</h3>
        <ul className='list'>
                {types.map(el => 
                    <li key={el.name} onClick={(e) => {
                        currentType == el.name ? setCurrentType("") : setCurrentType(el.name)
                        }} >
                            {el.name}
                    </li>
                )}
            </ul>
            <h3>Brand</h3>
            <ul className='list'>
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
                    <a href='https://www.apple.com/app-store' target='blank' className='logo appStore'/>
                    <a href='https://play.google.com/store/games' target='blank' className='logo playMarket'/>
                </div>
            </div>
                <ul className='usefulLinks'>
                    <li><Link to={'/FAQ'}><FaRegQuestionCircle />&nbsp;FAQ</Link></li>
                    <li><a href='#contact'><IoChatboxEllipsesOutline />&nbsp;Contact</a></li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar