import '../styles/Navbar.css'
import { useState } from 'react'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Navbar(){
    const [isOpened, setIsOpened] = useState(false)
    function toggleIsOpened(){
        setIsOpened(prev => !prev)
    }
    return (
        <nav>
            <img 
                src={`/images/icon-${isOpened ? 'close' : 'menu'}.svg`}
                className={`menu-btn ${isOpened ? 'opened' : ''}`}
                alt='Menu button' 
                onClick={toggleIsOpened}
            />
            <img className='logo'  alt='Logo' src='/images/logo.svg' />
            <div className={`nav-items-back ${isOpened ? "opened" : ""}`} onClick={toggleIsOpened}></div>
            <div className={`nav-items ${isOpened ? "opened" : ""}`}>
                <a>Collections</a>
                <a>Men</a>
                <a>Women</a>
                <a>About</a>
                <a>Contact</a>
            </div>
            <FontAwesomeIcon icon={faCartShopping} className='cart'  alt='Cart button' />
            <img className='avatar' alt='User avatar' src='/images/image-avatar.png' />
        </nav>
    )
}