import {FC, useEffect, useRef, useState} from "react";
import './sliderComponent.css';
import Glider from 'react-glider';
import ProductItem from "../productItem/ProductItem";
import { productItem } from "../../types/types";

interface SliderComponentI {
    products: productItem[],
    title?: string,
    slidesToShow: number
}

const SliderComponent:FC<SliderComponentI> = ({products, title, slidesToShow}) => {

    const [currentRowAmount, setCurrentRowAmount] = useState(1)
    const [offsetWidth, setOffsetWidth] = useState(0)

    const sliderContainerEl = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(sliderContainerEl.current){
            setOffsetWidth(sliderContainerEl.current?.offsetWidth)
        }
    }, [])

    const minElementsAmount = 2
    const elementsAmount = Math.floor(offsetWidth/170)

    return(
        <div ref={sliderContainerEl} className="SliderComponent-container">
            {title ? <h2 key={title}>{title}</h2> : <></>}
            <Glider
                slidesToShow={elementsAmount >= minElementsAmount ? elementsAmount : minElementsAmount} //Math.floor(window.innerWidth / 170        //products.length <= slidesToShow ? products.length : slidesToShow
                slidesToScroll={elementsAmount >= minElementsAmount ? elementsAmount : minElementsAmount}
                hasArrows={elementsAmount < products.length}
                draggable={elementsAmount < products.length} 
            >
                {elementsAmount >= 4 
                ? 
                    products.map(el => el !== null ? <div><ProductItem key={el.id} product={el} /></div> : <></>) 
                :
                    products.slice(0, (elementsAmount >= minElementsAmount ? elementsAmount : minElementsAmount) * currentRowAmount).map((el: productItem) => el !== null ? <div><ProductItem key={el.id} product={el} /></div> : <></>)
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