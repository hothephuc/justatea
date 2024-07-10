import React from 'react'
import product_data from '../components/assets/Data.js'
import Item from '../components/item/Item.js'
import './css/Menu.css'
import banner from '../components/assets/banner.jpg'

const Product = () => {
  return (
    <div className='menu'>
      <img className='banner' src={banner} alt=""/>
      <h className="menu-header">Thực đơn</h>
      <div className='menu-items'>
        {product_data.map((item,i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} price= {item.price}/>
        })}
      </div>
    </div>
  )
}

export default Product
