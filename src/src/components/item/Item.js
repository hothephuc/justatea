import React from 'react'
import './Item.css'

const item = (props) => {
  return (
    <div className='item'>
        <img src={props.image} alt = ""/>
        <div className='item-info'>
            <h>{props.name}</h>
            <p>{props.price}đ</p>
        </div>
    </div> 
  )
}

export default item