import React, {FC, ReactNode, useRef} from "react";
import './hiddenSection.css'

interface HiddenSectionI {
    title: string,
    children: ReactNode
}

const HiddenSection:FC<HiddenSectionI> = ({title, children}) => {

    const questions = useRef<HTMLDivElement>(null)

    const clickHandler = () => {
        if(questions.current){
            questions.current.classList.toggle('visible')
        }
    }

    return (
        <div className="section-container">
            <div className="section-title" onClick={clickHandler}>
                <h2>{title}</h2>
            </div>
            <div className="questions-container" ref={questions}>
                {children}
            </div>
        </div>
    )
}

export default HiddenSection