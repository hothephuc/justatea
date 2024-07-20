import React, {useState} from 'react'
import './ProductDisplay.css'

const ProductDisplay = (props) => {
    const {product}=props;
    const [selectedSize, setSelectedSize] = useState('Vừa');
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [price, setPrice] = useState(product.price);

    const handleSizeSelection = (size) => {
        setSelectedSize(size);
        updatePrice(size, selectedToppings);
    };
    const handleToppingSelection = (topping) => {
      let newToppings;
      if (selectedToppings.includes(topping)) {
          newToppings = selectedToppings.filter(t => t !== topping);
      } else {
          newToppings = [...selectedToppings, topping];
      }
      setSelectedToppings(newToppings);
      updatePrice(selectedSize, newToppings);
    };
    const updatePrice = (size, toppings) => {
      let newPrice = product.price;
      if (size === 'Lớn') {
          newPrice += 5000;
      }
      newPrice += toppings.length * 5000;
      setPrice(newPrice);
    };
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
                <div className='product-price'>{price}đ</div>
            </div>
            <div className='choose-size'>
              <p>Chọn size</p>
              <div className='size-option'>
                <div className={`size ${selectedSize === 'Vừa' ? 'selected' : ''}`} onClick={() => handleSizeSelection('Vừa')}>
                  <div>Vừa +0đ</div>
                </div>
                <div className={`size ${selectedSize === 'Lớn' ? 'selected' : ''}`} onClick={() => handleSizeSelection('Lớn')}>
                  <div>Lớn +5000đ</div>
                </div>
              </div>
            </div>
            <div className='choose-topping'>
              <p>Chọn size</p>
              <div className='topping-option'>
                <div className={`topping ${selectedToppings.includes('Trân châu') ? 'selected' : ''}`} onClick={() => handleToppingSelection('Trân châu')}>
                  <div>Trân châu + 5000đ</div>
                </div>
                <div className={`topping ${selectedToppings.includes('Caramel') ? 'selected' : ''}`} onClick={() => handleToppingSelection('Caramel')}>
                  <div>Sốt Caramel + 5000đ</div>
                </div>
                <div className={`topping ${selectedToppings.includes('Kem') ? 'selected' : ''}`} onClick={() => handleToppingSelection('Kem')}>
                  <div>Kem Cheese + 5000đ</div>
                </div>
              </div>
            </div>
            <button>Thêm vào giỏ hàng</button>
        </div>
    </div>
  )
}

export default ProductDisplay