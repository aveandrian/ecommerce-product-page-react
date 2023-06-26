import '../styles/Navbar.css'
import { useState } from 'react'

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
            <div className={`nav-items-back ${isOpened ? "opened" : ""}`}></div>
            <div className={`nav-items ${isOpened ? "opened" : ""}`}>
                <a>Collections</a>
                <a>Men</a>
                <a>Women</a>
                <a>About</a>
                <a>Contact</a>
            </div>
            <img className='cart'  alt='Cart button' src='/images/icon-cart.svg' />
            <img className='avatar' alt='User avatar' src='/images/image-avatar.png' />
        </nav>
    )
}