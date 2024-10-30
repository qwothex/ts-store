import React, {FC} from 'react'
import './footer.css'
import ContactForm from '../contactForm/ContactForm'

const Footer:FC = () => {
    return(
        <div className='footer'>
        <div className='footer-contact'>
            <ContactForm />
        </div>
        <div className='footer-main'>
            <div className='footer__logo' />
            <div className='footer__social-media'>
                <a href='https://www.linkedin.com/in/vladimir-nariadov-732571322' target='blank' className='icon linkedin'></a>
                <a href='https://telegram.com' target='blank' className='icon telegram'></a>
                <a href='https://github.com' target='blank' className='icon github'></a>
            </div>
            <span className='footer__rights'>2024 NV. All rights reserved</span>
        </div>
        </div>
    )
}

export default Footer