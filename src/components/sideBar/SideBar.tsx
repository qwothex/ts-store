import React, {FC} from 'react'
import './sideBar.css'

const SideBar:FC = () => {

    const categories = [
        {"name" : "Laptops", "picture" : "../assets/white-square.png"}, 
        {"name" : "Phones", "picture" : "../assets/white-square.png"}, 
        {"name" : "Friges", "picture" : "../assets/white-square.png"}
    ]

    return(
        <div className='sidebar_container'>
            <ul>
                {categories.map(el => <li key={el.name}><div className='image_replacement' />{el.name}</li>)}
            </ul>
        </div>
    )
}

export default SideBar