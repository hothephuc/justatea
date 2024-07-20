import React, { useContext, useState } from 'react'
import { MenuContext } from '../context/MenuContext.js'
import Item from '../components/item/Item.js'
import './css/Menu.css'
import banner from '../components/assets/banner.jpg'
import menu_category from  '../components/assets/Category.js'
import { Link } from 'react-router-dom'

const Menu = () => {
  const {product_data}=useContext(MenuContext);
  const [category,setCategory] = useState("All")
  return (
    <div className='menu'>
      <img className='banner' src={banner} alt=""/>
      <h className='menu-header'>Thực đơn</h>
      <div className='category'>
        {menu_category.map((item,index)=>{
          return(
            <div onClick={()=>setCategory(prev=>prev===item.category_name?"All":item.category_name)} key={index} className='category-item'>
              <img className={category===item.category_name?"active":""} src={item.category_image}  alt=""/>
              <p>{item.category_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
      <div className='menu-items'>
        {product_data.map((item1,i)=>{
          if (category==="All" || category===item1.tag) {
            return <Item key={i} id={item1.id} name={item1.name} image={item1.image} price= {item1.price} tag={item1.tag}/>
          } 
        })}
      </div>
      <Link to='/AddProduct' style={{ textDecoration: 'none' }}>
        <button className='add-product-button'>Thêm sản phẩm</button>
      </Link>
    </div>
  )
}

export default Menu
