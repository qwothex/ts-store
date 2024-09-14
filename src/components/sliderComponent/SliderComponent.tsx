import {FC} from "react";
import './sliderComponent.css';
import Glider from 'react-glider';
import { productItem } from "../../store/slices/productSlice";
import ProductItem from "../productItem/ProductItem";

interface SliderComponentProps {
    products: productItem[],
    title?: string
}

const GliderComponent:FC<SliderComponentProps> = ({products, title}) => {
    return(
        <div className="SliderComponent-container">
            {title ? <h1>{title}</h1> : <></>}
            <Glider
                slidesToShow={products.length <= 6 ? products.length : 6}
                slidesToScroll={3}
                hasArrows={!(products.length <= 6)}
                draggable
            >
                {products.map((el: productItem) => <div key={el.id}><ProductItem product={el} /></div>)}
            </Glider>
        </div>
    )
}

export default GliderComponent