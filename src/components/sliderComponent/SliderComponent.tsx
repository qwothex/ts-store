import {FC} from "react";
import './sliderComponent.css';
import Glider from 'react-glider';
import { productItem } from "../../store/slices/productSlice";
import ProductItem from "../productItem/ProductItem";

interface SliderComponentProps {
    products: productItem[],
    title?: string,
    slidesToShow: number,
    slidesToScroll: number
}

const SliderComponent:FC<SliderComponentProps> = ({products, title, slidesToScroll, slidesToShow}) => {
    return(
        <div className="SliderComponent-container">
            {title ? <h1 key={title}>{title}</h1> : <></>}
            <Glider
                slidesToShow={products.length <= slidesToShow ? products.length : slidesToShow}
                slidesToScroll={slidesToScroll}
                hasArrows={products.length > slidesToShow}
                draggable
            >
                {products.map((el: productItem) => el !== null ? <div><ProductItem key={el.id} product={el} /></div> : <></>)}
            </Glider>
        </div>
    )
}

export default SliderComponent