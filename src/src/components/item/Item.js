import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'

const Item = ({ id, name, imageUrl, price, tag, inStock }) => {
  return (
    
    <div className='item'>
      <Link style={{textDecoration: 'none'}} to ={`/Menu/${id}`}>
        <img src={imageUrl} alt = ""/>
        <div className='item-info'>
            <h>{name}</h>
        </div>
      </Link>
    </div> 
  )
}

// const Item = ({ id, name, imageUrl, price, tag }) => {
//   return (
//     <div className='item'>
//       <img src={imageUrl} alt={name} className='item-image' />
//       <h3>{name}</h3>
//       <p>{price.toLocaleString()}đ</p>
//     </div>
//   );
// }
export default Item