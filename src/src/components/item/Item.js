import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'

// const Item = (props) => {
//   return (
//     <Link style={{textDecoration: 'none'}} to ={`/Menu/${props.id}`}>
//     <div className='item'>
//         <img src={props.imageUrl} alt = ""/>
//         <div className='item-info'>
//             <h>{props.name}</h>
//             <p>{props.price}đ</p>
//         </div>
//     </div> 
//     </Link>
//   )
// }

const Item = ({ id, name, imageUrl, price, tag }) => {
  return (
    <div className='item'>
      <img src={imageUrl} alt={name} className='item-image' />
      <h3>{name}</h3>
      <p>{price.toLocaleString()}đ</p>
      <p>{tag}</p>
    </div>
  );
}
export default Item