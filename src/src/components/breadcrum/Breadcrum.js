import React from 'react'
import './Breadcrum.css'
import { Link } from 'react-router-dom'

const Breadcrum = (product) => {
    const handleClick = () => {
        window.scrollTo(0, 0);
      };
  return (
    <div className='breadcrum'>
        <Link to='/' style={{ textDecoration: 'none' }} onClick={handleClick}>
        <div style={{color:''}}>Home</div>
        </Link>/
        <Link to='/Menu' style={{ textDecoration: 'none' }} onClick={handleClick}><div>Menu</div>
        </Link>
        /
        {product.product.tag}/
        {product.product.name}
    </div>
  )
}

export default Breadcrum