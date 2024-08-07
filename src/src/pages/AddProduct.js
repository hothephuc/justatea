import React, { useState } from 'react';
import './css/AddProduct.css';
import { uploadProductInfo } from '../server/data-handle';
import menu_category from '../components/assets/Category';
import AdminController from '../controller/Admin';
const AddProduct = () => {
  const [productInfo, setProductInfo] = useState({
    name: '',
    price: '',
    category: 'Tea', // Initialize category as an empty string
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProductInfo({ ...productInfo, image: files[0] });
    } else {
      setProductInfo({ ...productInfo, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AdminController.uploadProductInfo(productInfo, productInfo.image);
      alert('Product uploaded successfully');
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Error uploading product: ' + error.message);
    }
  };

  return (
    <div className='add-product'>
      <div className='add-product-container'>
        <h1>Thêm sản phẩm</h1>
        <form onSubmit={handleSubmit}>
          <div className='add-product-fields'>
            <p>Tên sản phẩm</p>
            <input
              type="text"
              name="name"
              placeholder='Nhập'
              value={productInfo.name}
              onChange={handleChange}
            />
          </div>
          <div className='add-product-fields'>
            <p>Giá sản phẩm</p>
            <input
              type="text"
              name="price"
              placeholder='Giá'
              value={productInfo.price}
              onChange={handleChange}
            />
          </div>
          <div className='add-product-fields'>
            <p>Loại sản phẩm</p>
            <select
              name="category"
              className='add-product-selector'
              value={productInfo.category}
              onChange={handleChange}
            >
              {/* <option value="Tea">Tea</option>
              <option value="Cafe">Cafe</option>
              <option value="Food">Food</option> */}
              {menu_category.map((item,index)=>{
              return(
                <option value={item.category_name} key={index}>{item.category_name}</option>
              )
              })}
            </select>
          </div>
          <div className='add-product-fields'>
            <p>Mô tả sản phẩm</p>
            <input
              type="text"
              name="description"
              placeholder='Mô tả sản phẩm'
              value={productInfo.description}
              onChange={handleChange}
            />
          </div>
          <div className='add-product-fields'> 
            <p>Hình ảnh</p>
            <div className='add-product-image'>
                <label htmlFor='file-input'>
                    <img src={productInfo.image?URL.createObjectURL(productInfo.image):"https://static.thenounproject.com/png/187803-200.png"} alt=""></img>
                </label>
                <input onChange={handleChange} type="file" name="image" id="file-input" hidden/>
            </div>
        </div>
          <button 
            type="submit"
            className={productInfo.name && productInfo.price && productInfo.description && productInfo.image? "active":""}
            disabled={!productInfo.name || !productInfo.price || !productInfo.description || !productInfo.image}
          >Thêm sản phẩm</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;