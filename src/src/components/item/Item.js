import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'

const Item = (props) => {
  return (
    <Link style={{textDecoration: 'none'}} to ={`/Menu/${props.id}`}>
    <div className='item'>
        <img src={props.image} alt = ""/>
        <div className='item-info'>
            <h>{props.name}</h>
            <p>{props.price}đ</p>
        </div>
    </div> 
    </Link>
  )
}

export default Item