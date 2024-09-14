import React, {FC, useEffect, useRef} from "react";
import './hiddenText.css'
import { IoIosArrowUp } from "react-icons/io";

interface HiddenTextProps {
    question: string,
    answer: string
}

const HiddenText:FC<HiddenTextProps> = ({question, answer}) => {

    const inputElement = useRef<HTMLInputElement>(null)
    const answerElement = useRef<HTMLParagraphElement>(null)

    const inputClickHandler = () => {
        if(answerElement.current) answerElement.current.classList.toggle('visible')
    }

    return(
        <div className="hiddenText-container">
            <label onClick={inputClickHandler} className="labelForQuestion" htmlFor="inp"> <h3><IoIosArrowUp className="question-arrow" />{question}</h3> </label>
            <input ref={inputElement} id="inp" type='checkbox' />
            <p ref={answerElement} className="answer">{answer}</p>
        </div>
    )
}

export default HiddenText