import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import productData from './productData.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus, faMinus, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import {useMediaQuery} from 'react-responsive'

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxModalOpen, setLightboxModalOpen] = useState(false)
  const [countItem, setCountItem] = useState(0)
  const [cartItems, setCartItems] = useState([])

  const isMobile = useMediaQuery({ query: '(max-width: 950px)' })

  function toggleLightboxModalOpen(){
    setLightboxModalOpen(prev => !prev)
  }

  function handleRemoveItem(){
    if(countItem == 0)
      return
    setCountItem(prev => prev-1)
  }

  function handleAddItem(){
    setCountItem(prev => prev+1)
  }

  function prev(){
    setSelectedIndex(prev => prev-1)
  }

  function next(){
    setSelectedIndex(prev => prev+1)
  }

  function addItemToCart(){
    if(countItem < 1)
      return;

    setCartItems(prev => {
      let productFound = false
      let tempArr = prev.map(item => {
        if(item.id == productData.id){
          productFound=true; 
          return {...item, amount: item.amount + countItem } 
        }
        else return item
      })
      return productFound ? tempArr : [...prev, {
        id: productData.id,
        image: productData.images[0].thumbnail,
        name: productData.name,
        price: productData.discount ? parseFloat(productData.price * productData.discount).toFixed(2) : productData.price.toFixed(2),
        amount: countItem
      }]
    })
  }

  function removeItemFromCart(id){
    setCartItems(prev => prev.filter(item => item.id != id))
  }

  return (
    <>
      <Navbar cartItems={cartItems} removeItemFromCart={removeItemFromCart}/>
      <div className='main-divider'></div>
      <main>
        {isMobile 
        ? (
          <>
            <div className='image-carousel'>
              <div className='images-container' style={{transform: `translateX(-${selectedIndex * 100}%)`}}>
                {productData.images.map((image, i) => <div key={i} className='carousel-item'><img className='carousel-item-img' src={image.main}></img></div>)}
              </div>
              {selectedIndex != 0 && <div onClick={prev} className='prev-img-container'><img src='/images/icon-previous.svg' className='prev-img'/></div>}
              {selectedIndex < productData.images.length - 1  && <div onClick={next} className='next-img-container'><img src='/images/icon-next.svg' className='next-img'/></div>}
            </div>
          </>
        )
        : (
        <div className='image-section'>
          <img className='main-img' src={productData.images[selectedIndex].main} onClick={toggleLightboxModalOpen}></img>
          <div className='preview-imgs'>
            {productData.images.map((image, i) => <div key={i} onClick={()=>setSelectedIndex(i)}  className={`thumbnail-container ${selectedIndex == i ? "selected" : ""}`}><img src={image.thumbnail} /></div>)}
          </div>
        </div>
        )}
        <div className='product-description'>
          <p className='brand'>Sneaker Company</p>
          <h1 className='title'>{productData.name}</h1>
          <p className='decription'>{productData.description}</p>
          <div className='price-container'>
            <div className='price-wrapper'>
              <p className='price'>${productData.discount ? parseFloat(productData.price * productData.discount).toFixed(2) : productData.price}</p>
              {productData.discount && <span className='discount'>{productData.discount*100}%</span>}
            </div>
            {productData.discount && <p className='old-price'>${parseFloat(productData.price).toFixed(2)}</p>}
          </div>
          <div className='add-to-cart'>
            <div className='amount-container'>
              <div className='icon-container' onClick={handleRemoveItem}>
                <FontAwesomeIcon icon={faMinus}   className='remove-item' src='/images/icon-minus.svg'  />
              </div>
              <p className='count-item'>{countItem}</p>
              <div className='icon-container' onClick={handleAddItem}>
                <FontAwesomeIcon icon={faPlus}  className='add-item' src='/images/icon-plus.svg'  />
              </div>
            </div>
            <button className='add-to-cart-btn' onClick={addItemToCart}><FontAwesomeIcon icon={faCartShopping}/>Add to cart</button>
          </div>
        </div>
      </main>
      {lightboxModalOpen && (
        <div className='modal-wrapper'>
          <div className='modal-content'>
            <FontAwesomeIcon  alt="Close modal" size='2xl' icon={faXmark} onClick={toggleLightboxModalOpen} className='close-modal'/>
            <div className='main-img-wrapper'>
             
              <img className='main-img' src={productData.images[selectedIndex].main}/>
              {selectedIndex != 0 && <div onClick={prev} className='prev-img-container'><img src='/images/icon-previous.svg' className='prev-img'/></div>}
              {selectedIndex < productData.images.length - 1  && <div onClick={next} className='next-img-container'><img src='/images/icon-next.svg' className='next-img'/></div>}
            </div>
            <div className='preview-imgs'>
              {productData.images.map((image, i) => <div key={i} onClick={()=>setSelectedIndex(i)}  className={`thumbnail-container ${selectedIndex == i ? "selected" : ""}`}><img src={image.thumbnail} /></div>)}
            </div>
          </div>
        </div>
      )}
      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://github.com/aveandrian">aveandrian</a>.
      </div>
    </>
  )
}

export default App
