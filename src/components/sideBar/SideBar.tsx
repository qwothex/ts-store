import {FC} from 'react'
import './sideBar.css'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { TiVendorApple } from "react-icons/ti";
import { SiSamsung } from "react-icons/si";
import { IconType } from 'react-icons';
import { SiAsus } from "react-icons/si";
import { SiAcer } from "react-icons/si";
import { SiXiaomi } from "react-icons/si";
import { IoMdLaptop } from "react-icons/io";
import { IoIosPhonePortrait } from "react-icons/io";
import { BsPc } from "react-icons/bs";
import { IoMdTv } from "react-icons/io";

const SideBar:FC = () => {

    const {setCurrentBrand, setCurrentType} = useActions()

    const types = [
        {"name" : "Laptop", "logo" : IoMdLaptop}, 
        {"name" : "Phone", "logo" : IoIosPhonePortrait},  
        {"name" : "PC", "logo" : BsPc},
        {"name" : "TV", "logo" : IoMdTv},
    ]

    const brands = [ 
        {"name" : "Apple", "logo" : TiVendorApple}, 
        {"name" : "Samsung", "logo" : SiSamsung}, 
        {"name" : "Asus", "logo" : SiAsus}, 
        {"name" : "Acer", "logo" : SiAcer}, 
        {"name" : "Xiaomi", "logo" : SiXiaomi} 
    ]

    const {currentType} = useAppSelector(state => state.productReducer)
    const {currentBrand} = useAppSelector(state => state.productReducer)

    return(
        <div className='sidebar-container'>
            <input type='checkbox' id='burger-checkbox' className='burger-checkbox'/>
            <label htmlFor="burger-checkbox" className='burger-label'></label>

            <div className='sidebar-content'>
            <h3>Type</h3>
        <ul className='list'>
                {types.map((el : {name: string, logo: IconType}) => 
                    <li key={el.name} onClick={(e) => {
                        currentType == el.name ? setCurrentType("") : setCurrentType(el.name)
                        }} >
                            <el.logo size={19}></el.logo>{el.name}
                    </li>
                )}
            </ul>
            <h3>Brand</h3>
            <ul className='list'>
                {brands.map((el: {name: string, logo: IconType}) => 
                    <li key={el.name} onClick={(e) => {
                        currentBrand == el.name ? setCurrentBrand("") : setCurrentBrand(el.name)
                        }} >
                            <el.logo size={21}></el.logo>{el.name}
                    </li>
                )}
            </ul>
            <div className='download-links'>
                <h4>Download our apps</h4>
                <div className='store-logos'>
                    <a href='https://www.apple.com/app-store' target='blank' className='sideBar-logo appStore'/>
                    <a href='https://play.google.com/store/games' target='blank' className='sideBar-logo playMarket'/>
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