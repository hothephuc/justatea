import React from 'react'
import product_data from '../components/assets/Data.js'
import Item from '../components/item/Item.js'
import './css/Product.css'

const Product = () => {
  return (
    <div className='product'>
      <div className='product-items'>
        {product_data.map((item,i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} price= {item.price}/>
        })}
      </div>
    </div>
  )
}

export default Product
