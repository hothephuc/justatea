import React from 'react'
import './Footer.css'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={logo} alt=""/>
            <p>JustaTea</p>
        </div>
        <div className='footer-copyright'>
            <hr/>
            <p>Copyright @ 2024 - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer