import React from 'react'
import './ProductDisplay.css'

const ProductDisplay = (props) => {
    const {product}=props;
  return (
    <div className='productdisplay'>
        <div className='productdisplay-left'>
            <div className='productdisplay-img'>
                <img src={product.image}/>
            </div>
        </div>
        <div className='productdisplay-right'>
            <div className='product-info'>
                <h1>{product.name}</h1>
                <div className='product-price'>{product.price}đ</div>
            </div>
            <div className='choose-size'>
              <p>Chọn size</p>
              <div className='size-option'>
                <div className='size'>
                  <div>Nhỏ</div>
                </div>
                <div className='size'>
                  <div>Vừa</div>
                </div>
                <div className='size'>
                  <div>Lớn</div>
                </div>
              </div>
            </div>
            <button>Thêm vào giỏ hàng</button>
        </div>
    </div>
  )
}

export default ProductDisplay