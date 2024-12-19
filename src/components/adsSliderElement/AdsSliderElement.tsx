import { FC, ReactNode, useContext } from 'react'
import './adsSliderElement.css'
import {SliderContext} from '../adsSlider/slider-context'

interface adsSliderElementI{
    children: ReactNode
}

const AdsSliderElement:FC<adsSliderElementI> = ({ children }) => {

    const ELEMENT_WIDTH = useContext(SliderContext)

    return (
        <div className='slider-element' style={{minWidth: ELEMENT_WIDTH, maxWidth: ELEMENT_WIDTH}}>
            {children}
        </div>
    )
}

export default AdsSliderElement