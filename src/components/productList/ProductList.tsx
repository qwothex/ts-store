import React, {FC} from "react";
import Glider from 'react-glider';
import "glider-js/glider.min.css";
import ProductItem from "../productItem/ProductItem";
import { useAppSelector } from "../../hooks/useAppSelector";
import './productList.css'

const ProductList:FC = () => {

    const products = useAppSelector(state => state.productReducer.products)

    return(
    <div>
        <h1>Recomendations</h1>
        <Glider
            slidesToShow={products.rows.length <= 4 ? products.rows.length : 4}
            slidesToScroll={3}
            hasArrows
            draggable
        >
            {products.rows.map((el) => <div key={el.id}><ProductItem product={el} /></div>)}
        </Glider>
    </div>
    )
} 

export default ProductList