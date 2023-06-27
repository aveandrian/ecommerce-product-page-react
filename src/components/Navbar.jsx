import '../styles/Navbar.css'
import { useState } from 'react'
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Navbar({cartItems, removeItemFromCart}){
    const [isOpened, setIsOpened] = useState(false)
    const [cartIsOpened, setCartIsOpened] = useState(false)

    const countItemsInCart = () => {
        if(cartItems.length > 0){
            let sum = 0;
            cartItems.forEach(item => sum += item.amount)
            return sum
        }
        return 0
    }
    const itemsInCart = countItemsInCart()

    function toggleIsOpened(){
        setCartIsOpened(false)
        setIsOpened(prev => !prev)
    }

    function toggleCartIsOpened(){
        setCartIsOpened(prev => !prev)
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
            <div className='cart-wrapper' onClick={toggleCartIsOpened}>
                <FontAwesomeIcon icon={faCartShopping} className='cart-icon'  alt='Cart button' />
                {cartItems.length > 0 && <div className='cart-items-amount'>{itemsInCart}</div>}
                {cartIsOpened && (
                    <div className='cart-container'>
                        <p className='cart-container-title'>Cart</p>
                        <div className='cart-container-divider' />
                        
                        <div className='cart-container-items'>
                        {cartItems.length > 0 && cartItems.map(cartItem=>{
                            return (
                                <div className='cart-item-container' key={cartItem.id}>
                                    <img className='cart-item-img' src={cartItem.image}></img>
                                    <div className='cart-item-description'>
                                        <p className='cart-item-title'>{cartItem.name}</p>
                                        <p className='cart-item-price'>${cartItem.price} x {cartItem.amount} <span className='total-price'>${parseFloat(cartItem.price * cartItem.amount).toFixed(2)}</span></p>
                                    </div>
                                    <FontAwesomeIcon icon={faTrashCan} className='delete-item-icon' onClick={() => removeItemFromCart(cartItem.id)}/>
                                </div>
                            )
                        })}
                        {cartItems.length > 0 && <button className='checkout-btn'>Checkout</button>}
                        {cartItems.length == 0 && <p className='cart-empty-text'>Your cart is empty</p>}
                        </div>
                    </div>
                )}
            </div>
            <img className='avatar' alt='User avatar' src='/images/image-avatar.png' />
        </nav>
    )
}