import React, { useState, useEffect } from 'react';
import './ProductDisplay.css';
import { checkAuthState } from '../../server/auth'; // Adjust the import path accordingly
import CartController from '../../controller/Cart';
const ProductDisplay = ({ product }) => {
  const [uid, setUid] = useState(null); // State to hold user ID
  const productID = product.id; // Product ID variable
  const [selectedSize, setSelectedSize] = useState('Vừa');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [price, setPrice] = useState(Number(product.price)); // Ensure the price is a number

  useEffect(() => {
    // Get user ID on component mount
    const getUserId = async () => {
      const authData = await checkAuthState();
      if (authData) {
        setUid(authData.user.uid); // Set user ID if user is signed in
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    // Update price when product changes
    setPrice(Number(product.price));
  }, [product]);

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    updatePrice(size, selectedToppings);
  };

  const handleToppingSelection = (topping) => {
    const newToppings = selectedToppings.includes(topping)
      ? selectedToppings.filter((t) => t !== topping)
      : [...selectedToppings, topping];

    setSelectedToppings(newToppings);
    updatePrice(selectedSize, newToppings);
  };

  const updatePrice = (size, toppings) => {
    let newPrice = Number(product.price);
    if (size === 'Lớn') {
      newPrice += 5000;
    }
    newPrice += toppings.length * 5000;
    setPrice(newPrice);
  };

  const handleAddToCart = async () => {
    if (!uid) {
      alert("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng."); // Prompt user to log in if uid is not available
      return;
    }

    const newCustomerCart = {
      ProductList: [productID], // Use productID variable
      quantityList: [1], // Set initial quantity for the added product
      sizeList: [selectedSize], // Add the selected size
      toppingList: selectedToppings.length > 0 ? [selectedToppings.join(',')] : [null], // Join toppings into a string
      priceList: [price] // Set initial price to 0
    };
    

    try {
      await CartController.updateCustomerCart(uid, productID, newCustomerCart); // Pass product ID as well
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  return (
    <div className='productdisplay'>
      <div className='productdisplay-left'>
        <div className='productdisplay-img'>
          <img src={product.imageUrl} alt={product.name} />
        </div>
      </div>
      <div className='productdisplay-right'>
        <div className='product-info'>
          <h1>{product.name}</h1>
          <div className='product-price'>{price.toLocaleString()}đ</div>
        </div>
        <div className='choose-size'>
          <p>Chọn size</p>
          <div className='size-option'>
            <div
              className={`size ${selectedSize === 'Vừa' ? 'selected' : ''}`}
              onClick={() => handleSizeSelection('Vừa')}
            >
              <div>Vừa +0đ</div>
            </div>
            <div
              className={`size ${selectedSize === 'Lớn' ? 'selected' : ''}`}
              onClick={() => handleSizeSelection('Lớn')}
            >
              <div>Lớn +5000đ</div>
            </div>
          </div>
        </div>
        {product.tag!="Food"?(
        <div className='choose-topping'>
          <p>Chọn topping</p>
          <div className='topping-option'>
            <div
              className={`topping ${selectedToppings.includes('Trân châu') ? 'selected' : ''}`}
              onClick={() => handleToppingSelection('Trân châu')}
            >
              <div>Trân châu + 5000đ</div>
            </div>
            <div
              className={`topping ${selectedToppings.includes('Caramel') ? 'selected' : ''}`}
              onClick={() => handleToppingSelection('Caramel')}
            >
              <div>Sốt Caramel + 5000đ</div>
            </div>
            <div
              className={`topping ${selectedToppings.includes('Kem') ? 'selected' : ''}`}
              onClick={() => handleToppingSelection('Kem')}
            >
              <div>Kem Cheese + 5000đ</div>
            </div>
          </div>
        </div>):(<div></div>)}
        <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
};

export default ProductDisplay;
