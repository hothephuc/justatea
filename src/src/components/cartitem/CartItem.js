import React, { useContext, useState, useEffect } from 'react'
import './CartItem.css'
import { MenuContext } from '../../context/MenuContext'
import { checkAuthState } from '../../server/auth'
import CartController from '../../controller/Cart'
const CartItem = (uid) => { 
    const {productData}=useContext(MenuContext)
    const [cartProducts, setCartProducts] = useState([]);
    const [cart, setCart] = useState({
      ProductList: [],
      priceList: [],
      quantityList: [],
      sizeList: [],
      toppingList: []
    });

    useEffect(() => {
      const getCart = async () => {
        const cart = await CartController.retrieveCart(uid.uid);
        setCart(cart);
      };
  
      getCart();
    }, []);


    const getProductById = (productId) => {
      const product = productData.find(product => product.id === productId);
      if (product) {
        const { name, imageUrl } = product; // Chỉ lấy tên và ảnh
        return { name, imageUrl };
      }
      return null;
    };

    useEffect(() => {
      if (productData.length > 0 && cart.ProductList.length > 0) {
        const productsInCart = cart.ProductList.map((productId, index) => {
          const product = getProductById(productId);
          console.log("ok")
          if (product) {
            const { name, imageUrl } = product;
            return {
              id: productId,
              name,
              imageUrl,
              price: cart.priceList[index],
              quantity: cart.quantityList[index],
              size: cart.sizeList[index],
              toppings: cart.toppingList[index]
            };
          }
          return null;
        }).filter(product => product !== null);
  
        setCartProducts(productsInCart);
      }
    }, [productData, cart]);

    const handleQuantityChange = async (index, action) => {
      const updatedCartProducts = cartProducts.map((product, i) => {
          if (i === index) {
              const newQuantity = action === "increase" ? product.quantity + 1 : product.quantity - 1;
              return { ...product, quantity: newQuantity > 0 ? newQuantity : 1 }; // Ensure quantity does not go below 1
          }
          return product;
      });

      setCartProducts(updatedCartProducts);

      // Update the quantity in the database
      await CartController.modifyItemQuantity(uid.uid, index, action);
    };

    const handleRemoveItem = async (index) => {
      const updatedCartProducts = cartProducts.filter((_, i) => i !== index);

      setCartProducts(updatedCartProducts);

      // Remove the item from the database
      await CartController.removeItemFromCart(uid.uid, index);

      // Also update the cart state to keep it in sync
      const updatedCart = {
          ProductList: cart.ProductList.filter((_, i) => i !== index),
          priceList: cart.priceList.filter((_, i) => i !== index),
          quantityList: cart.quantityList.filter((_, i) => i !== index),
          sizeList: cart.sizeList.filter((_, i) => i !== index),
          toppingList: cart.toppingList.filter((_, i) => i !== index)
      };

      setCart(updatedCart);
  };

  const totalPrice = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
  const shippingFee = 15000;
  const finalPrice = totalPrice + shippingFee;

  return (
    <div className='cart-items'>
      <div className='car-item-up'>
        <div className='cart-items-header'>
          <p>Sản phẩm</p>
          <p>Tên sản phẩm</p>
          <p>Kích cỡ</p>
          <p>Topping</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng cộng</p>
          <p>Tùy chỉnh</p>
        </div>
        <hr/>     
        <div>
          {cartProducts.map((product, index)=>(
          <div className='cart-items-item cart-items-header'>
            <div className='cart-item-icon'>
              <img src={product.imageUrl} alt=""/>
            </div>
            <p>{product.name}</p>
            <p>{product.size}</p>
            <div>
            {product.toppings?(<p>{product.toppings}</p>):(<p>Không</p>)}
            </div>
            <p>{product.price}đ</p>
            <button className='cart-item-quanity'>{product.quantity}</button>
            <p>{product.price*product.quantity}đ</p>
            <div>
            <button className='change-button' onClick={()=>handleQuantityChange(index, "increase")}>+</button>
            <button className='change-button' onClick={()=>handleQuantityChange(index, "decrease")}>-</button>
            <button className='change-button' onClick={()=>handleRemoveItem(index)}>x</button>
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
            <p>{totalPrice}đ</p>
          </div>
            
          <div className='cart-items-total-price'>
            <p>Phí giao hàng</p>
            <p>{shippingFee}đ</p>
          </div>
            
          <div className='cart-items-total-price'>
            <p>Đơn giá</p>
            <p>{finalPrice}đ</p>
          </div>
          <button>Đi đến mục thanh toán</button>
        </div>
      </div>
    </div>
  )
}

export default CartItem