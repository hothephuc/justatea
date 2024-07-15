import React from 'react'
import './css/AddProduct.css'

const AddProduct = () => {
  return (
    <div className='add-product'>
      <div className='add-product-container'>
        <h1>Thêm sản phẩm</h1>
        <div className='add-product-fields'>
            <p>Tên sản phẩm</p>
                <input
                    type="text"
                    name="name"
                    placeholder='Nhập'
                />
        </div>
        <div className='add-product-fields'>
                <p>Giá sản phẩm</p>
                <input
                        type="text"
                        name="price"
                        placeholder='Giá'
                />
        </div>
        <div className='add-product-fields'>
            <p>Loại sản phẩm</p>
            <select name="category" className='add-product-selector'>
                <option value="Tea">Tea</option>
                <option value="Cafe">Cafe</option>
                <option value="Food">Food</option>
            </select>
        </div>
        <div className='add-product-fields'>
            <p>Mô tả sản phẩm</p>
            <input
                    type="text"
                    name="desciption"
                    placeholder='Mô tả sản phẩm'
            />
        </div>
        <div className='add-product-fields'>
            <label htmlFor='file-input'>
                <img src="https://static.thenounproject.com/png/187803-200.png" alt=""></img>
                <input type="file" name="image" id="file-input" hidden/>
            </label>
        </div>
        <button>Thêm sản phẩm</button>
       </div>
    </div>
  )
}

export default AddProduct