import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import productData from './productData.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {useMediaQuery} from 'react-responsive'

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxModalOpen, setLightboxModalOpen] = useState(false)

  const isMobile = useMediaQuery({ query: '(max-width: 950px)' })

  console.log(isMobile)
  function toggleLightboxModalOpen(){
    setLightboxModalOpen(prev => !prev)
  }

  function prev(){
    setSelectedIndex(prev => prev-1)
  }

  function next(){
    setSelectedIndex(prev => prev+1)
  }

  return (
    <>
      <Navbar />
      <div className='main-divider'></div>
      <main>
        {isMobile 
        ? (
          <>
            <div className='image-carousel'>
              <div className='images-container' style={{transform: `translateX(-${selectedIndex * 100}%)`}}>
                {productData.images.map(image => <div className='carousel-item'><img className='carousel-item-img' src={image.main}></img></div>)}
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
            <p className='price'>${productData.discount ? productData.price * productData.discount : productData.price}</p>
            {productData.discount && <span className='discount'>{productData.discount*100}%</span>}
            {productData.discount && <p className='old-price'>${productData.price}</p>}
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
      

      

      

      $125.00
      50%
      $250.00

      0
      Add to cart

      Sneaker Company

      Fall Limited Edition Sneakers

      These low-profile sneakers are your perfect casual wear companion. Featuring a 
      durable rubber outer sole, they’ll withstand everything the weather can offer.

      $125.00
      50%
      $250.00

      0
      Add to cart

      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://github.com/aveandrian">aveandrian</a>.
      </div>
    </>
  )
}

export default App