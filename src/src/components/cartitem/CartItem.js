import React, { useContext, useState, useEffect } from 'react'
import './CartItem.css'
import { MenuContext } from '../../context/MenuContext'
import { fetchProducts } from '../../server/data-handle'

const CartItem = () => { 
    const {productData}=useContext(MenuContext)

    const Cart = [
      { productID: '1FzKKYy6JhoBDykPujyl', quantity: 1, price: 20000 },
      { productID: 'GxRLEiU7YPjSb6QdsF8J', quantity: 1, price: 30000 },
    ];

    const [cartProducts, setCartProducts] = useState([]);

    const getProductById = (productId) => {
      const product = productData.find(product => product.id === productId);
      if (product) {
        const { name, imageUrl } = product; // Chỉ lấy tên và ảnh
        return { name, imageUrl };
      }
      return null;
    };

    useEffect(() => {
      if (productData.length > 0) { // Chỉ chạy khi productData có dữ liệu
        const productsInCart = Cart.map(item => {
          const product = getProductById(item.productID);
          return { ...product, quantity: item.quantity, price: item.price };
        }).filter(product => product !== null); // Lọc các sản phẩm không tìm thấy
        setCartProducts(productsInCart);
      }
    }, [productData]); // Thêm productData vào dependency array

  return (
    <div className='cart-items'>
      <div className='car-item-up'>
        <div className='cart-items-header'>
          <p>Sản phẩm</p>
          <p>Tên sản phẩm</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng cộng</p>
          <p>Tùy chỉnh</p>
        </div>
        <hr/>     
        <div>
          {cartProducts.map((product)=>(
          <div className='cart-items-item cart-items-header'>
            <img className='cart-item-icon' src={product.imageUrl} alt=""/>
            <p>{product.name}</p>
            <p>{product.price}đ</p>
            <button className='cart-item-quanity'>{product.quantity}</button>
            <p>{product.price*product.quantity}đ</p>
            <div>
            <button className='change-button'>+</button>
            <button className='change-button'>-</button>
            <button className='change-button'>x</button>
            </div>
          </div>
          ))}
        </div>
        <hr/>
      </div>
      <div className='cart-items-down'>
        <img src="https://i.redd.it/b1u8f6b8t5491.jpg" alt=""></img>
        <div className='cart-items-total'>
          <h2>Tổng giá tiền</h2>
          <div className='cart-items-total-price'>
            <p>Tổng giá tiền sản phẩm</p>
            <p>{0}đ</p>
          </div>
            
          <div className='cart-items-total-price'>
            <p>Phí giao hàng</p>
            <p>{10000}đ</p>
          </div>
            
          <div className='cart-items-total-price'>
            <p>Đơn giá</p>
            <p>{10000}đ</p>
          </div>
          <button>Đi đến mục thanh toán</button>
        </div>
      </div>
    </div>
  )
}

export default CartItem