import {ReactNode, useEffect, useRef, useState} from "react";
import './adsSlider.css'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import AdsSliderElement from "../adsSliderElement/AdsSliderElement";
import { SliderContext } from "./slider-context";

export const AdsSlider = ({children}: {children: ReactNode[]}) => {

    const [offset, setOffset] = useState(0)
    const [width, setWidth] = useState(450)

    const viewAreaEl = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const resizeHandler = () => {
            const _width = viewAreaEl.current?.offsetWidth
            if(_width){
                setWidth(_width)
                setOffset(0)
            }
        }
        resizeHandler()
        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    const leftClickHandler = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + width
            return Math.min(newOffset, 0)
        })
    }

    const rightClickHandler = () => {
        setOffset((currentOffset) => {
            return Math.max(currentOffset - width, -(width * (children!.length - 1)))
        })
    }

    return(
        <SliderContext.Provider value={width}>
            <div className="slider-container">
                <IoIosArrowBack onClick={leftClickHandler} size={30} style={{position: "absolute", left: -25, zIndex: 10}} cursor={'pointer'}/>
                <div className="view-area" ref={viewAreaEl}>
                    <div className="all-elements" style={{transform: `translateX(${offset}px)`}}>{children}</div>
                </div>
                <IoIosArrowForward onClick={rightClickHandler} size={30} style={{position: "absolute", right: -25}} cursor={'pointer'}/>
            </div>
        </SliderContext.Provider>
    )
}

AdsSlider.Element = AdsSliderElement