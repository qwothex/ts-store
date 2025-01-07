import {FC, useEffect, useRef, useState} from "react";
import './sliderComponent.css';
import Glider from 'react-glider';
import ProductItem from "../productItem/ProductItem";
import { productItem } from "../../types/types";

interface SliderComponentI {
    products: productItem[],
    title?: string
}

const SliderComponent:FC<SliderComponentI> = ({products, title}) => {

    const [currentRowAmount, setCurrentRowAmount] = useState(1)
    const [offsetWidth, setOffsetWidth] = useState(0)

    const sliderContainerEl = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(sliderContainerEl.current){
            setOffsetWidth(sliderContainerEl.current?.offsetWidth)
        }

        const resizeHandler = () => {
            const _width = sliderContainerEl.current?.offsetWidth
            setOffsetWidth(_width!)
        }

        resizeHandler()
        window.addEventListener('resize', resizeHandler)
    
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    let elementsAmount = Math.max(Math.round(offsetWidth/170), 2) // 434 555
    if(offsetWidth < 510) elementsAmount = 2

    return(
        <div ref={sliderContainerEl} className="SliderComponent-container">
            {title ? <h2 key={title}>{title}</h2> : <></>}
            <Glider
                slidesToShow={elementsAmount}
                slidesToScroll={elementsAmount}
                hasArrows={elementsAmount < products.length}
                draggable={elementsAmount >= products.length}
            >
                {elementsAmount > 3
                ? 
                    products.map(el => el !== null ? <div key={el.id}><ProductItem key={el.id} product={el} /></div> : <></>) 
                :
                    products.slice(0, (elementsAmount) * currentRowAmount)
                    .map((el: productItem) => el !== null ? <div key={el.id}><ProductItem key={el.id} product={el} /></div> : <></>)
                }
            </Glider>
            <div className="button-container">
                <button className="show-more-button" onClick={() => setCurrentRowAmount((state) => state + 1)}>
                    Show more
                </button>
            </div>
        </div>
    )
}

export default SliderComponent