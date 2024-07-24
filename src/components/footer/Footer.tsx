import React, {FC} from 'react'
import './footer.css'

const Footer:FC = () => {
    return(
        <div className='footer'>
            <div className='footer__logo' />
            <div className='footer__social-media'>
                <a href='https://linkedin.com' target='blank' className='icon linkedin'></a>
                <a href='https://telegram.com' target='blank' className='icon telegram'></a>
                <a href='https://github.com' target='blank' className='icon github'></a>
            </div>
            <span className='footer__rights'>NV. All rights reserved</span>
        </div>
    )
}

export default Footer