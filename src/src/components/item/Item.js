import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='item'>
      <Link style={{textDecoration: 'none'}} to ={`/Menu/${props.id}`}>
        <img src={props.image} alt = ""/>
        <div className='item-info'>
            <h>{props.name}</h>
            <p>{props.price}đ</p>
        </div>
      </Link>
    </div> 
 
  )
}

export default Item