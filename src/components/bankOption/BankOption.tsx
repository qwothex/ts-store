import {ChangeEvent, FC, useState} from 'react'
import './bankOption.css'

const BankOption:FC<{price: number, title: string, logoPath: string, onClick: () => void}> = ({price, title, logoPath, onClick}) => {

    const [selectedPeriod, setSelectedPeriod] = useState(10)

    const selectHandler = (e:ChangeEvent<HTMLSelectElement>) => {
        switch(e.currentTarget.selectedIndex){
            case 0:
                setSelectedPeriod(10)
                break;

            case 1:
                setSelectedPeriod(7)
                break;

            case 2:
                setSelectedPeriod(5)
                break;
        }
    }

    return(
        <div className='bankOption'>
            <div className='bankInfo'>
                <img className={'icon icon-' + logoPath} />
                <h3>Payment in installments from {title}</h3>
                <span>from {price / 10}$ / mo</span>
            </div>
            <select onChange={selectHandler}>
                <option>10 payments</option>
                <option>7 payments</option>
                <option>5 payments</option>
            </select>
            <div>
                <span className='monthly-price'>{Math.floor(price / selectedPeriod)}$ / mo</span>
                <button className='selectBank-button' onClick={onClick}>Select</button>
            </div>
        </div>
    )
}

export default BankOption