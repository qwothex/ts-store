import {FC} from 'react'
import './sideBar.css'
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Link, useSearchParams } from 'react-router-dom';
import { IconType } from 'react-icons';
import { types } from '../../utils/types & brands/types';
import { brands } from '../../utils/types & brands/brands';

const SideBar:FC = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    return(
        <div className='sidebar-container'>
            <input type='checkbox' id='burger-checkbox' className='burger-checkbox'/>
            <label htmlFor="burger-checkbox" className='burger-label'></label>

            <div className='sidebar-content'>
            <h3>Type</h3>
        <ul className='list'>
                {types.map((el : {name: string, logo: IconType}) => 
                    <li key={el.name} onClick={(e) => {
                        searchParams.set('type', el.name)
                        setSearchParams(searchParams)
                        }} >
                            <el.logo size={19}></el.logo>{el.name}
                    </li>
                )}
            </ul>
            <h3>Brand</h3>
            <ul className='list'>
                {brands.map((el: {name: string, logo: IconType}) => 
                    <li key={el.name} onClick={(e) => {
                        searchParams.set('brand', el.name)
                        setSearchParams(searchParams)
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