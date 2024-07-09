import React from 'react'
import './Item.css'

const item = (props) => {
  return (
    <div className='item'>
        <img src={props.image} alt = ""/>
        <div className='item-info'>
            <h>{props.name}</h>
            <div className='item-prices'>{props.price}</div>
        </div>
    </div> 
  )
}

export default item