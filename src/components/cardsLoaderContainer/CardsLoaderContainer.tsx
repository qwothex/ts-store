import {FC} from 'react'
import './cardsLoaderContainer.css'
import CardLoader from '../cardLoader/CardLoader'

const CardsLoaderContainer:FC<{cardsQuantity: number}> = ({cardsQuantity}) => {
    const arr: number[] = Array.from(Array(cardsQuantity).keys())

    return(
        <div className='cardsLoader-container'>
            {arr.map(el => <CardLoader key={el} />)}
        </div>
    )
}

export default CardsLoaderContainer