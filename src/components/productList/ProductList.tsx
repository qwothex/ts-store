import React, {FC} from "react";
import Glider from 'react-glider';
import "glider-js/glider.min.css";
import ProductItem from "../productItem/ProductItem";
import { useAppSelector } from "../../hooks/useAppSelector";
import './productList.css'
import { productItem } from "../../store/slices/productSlice";

const ProductList:FC = () => {

    const {products} = useAppSelector(state => state.productReducer)
    const {lastview} = useAppSelector(state => state.productReducer)

    return(
    <>
    {lastview?.length ? 
    <div className={lastview!.length <= 4 ? "recentlyViewed-container" : ""}>
        <h1>Recently viewed</h1>
        <Glider
            slidesToShow={lastview!.length <= 6 ? products.rows.length : 6}
            slidesToScroll={3}
            hasArrows={!(lastview!.length <= 6)}
            draggable
        >
            {lastview.map((el: productItem) => <div key={el.id}><ProductItem product={el} /></div>)}
        </Glider>
    </div> 
        : <></>}
    <div>
        <h1>Recomendations</h1>
        <Glider
            slidesToShow={products.rows.length <= 6 ? products.rows.length : 6}
            slidesToScroll={3}
            hasArrows={!(lastview!.length <= 6)}
            draggable
        >
            {products.rows.map((el) => <div key={el.id}><ProductItem product={el} /></div>)}
        </Glider>
    </div>
    </>
    )
} 

export default ProductList