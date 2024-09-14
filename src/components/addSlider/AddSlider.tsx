import React, {Children, cloneElement, FC, ReactNode, useEffect, useState} from "react";
import './addSlider.css'
import { HiOutlineArrowSmRight, HiOutlineArrowSmLeft } from "react-icons/hi";
import '../../assets/ads1.jpg'

interface AddSliderProps {
    children: ReactNode
}

const AddSlider:FC<AddSliderProps> = ({children}) => {

    const ELEMENT_WIDTH = 1050

    const [elements, setElements] = useState([])
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        setElements(
            Children.map(children, (child: any, index) => {
              return cloneElement(child, {
                style: {
                    height: '100%',
                    maxWidth: '100%',
                    minWidth: '100%',
                },
                className: `ads ${'ads' + (index + 1)}` // className: 'ads ads1/2/3'
              })
            })
        )
    }, [])

    const rightClickHandler = () => {
        setOffset(Math.max(offset - ELEMENT_WIDTH, -(ELEMENT_WIDTH * (elements.length - 1))))
    }

    const leftClickHandler = () => {
        setOffset(Math.min(offset + ELEMENT_WIDTH, 0))
    }

    return(
        <div className="slider-container">
            <HiOutlineArrowSmLeft onClick={leftClickHandler} size={30} style={{position: "absolute", left: -25, zIndex: 10}} cursor={'pointer'}/>
            <div className="view-area">
                <div className="all-elements" style={{transform: `translateX(${offset}px)`}}>{elements}</div>
            </div>
            <HiOutlineArrowSmRight onClick={rightClickHandler} size={30} style={{position: "absolute", right: -25}} cursor={'pointer'}/>
        </div>
    )
}

export default AddSlider