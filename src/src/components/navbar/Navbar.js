import React, {useState, useRef} from 'react'
import "./Navbar.css"
import logo from '../assets/logo.png'
import {Link} from 'react-router-dom'

const Navbar= () => {
  const [menu,setMenu] = useState("home");

  const navRef =useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive-nav");
  }

  return (
    <div className="navbar">
      <div className='nav-logo'>
        <img src={logo} alt=""/>
        <p>JustaTea</p>
      </div>
      <nav /*className={`nav-menu ${isOpen ? 'open' : ''}`} */ className="nav-menu" ref={navRef}>
        <a onClick={()=> {setMenu("home"); showNavbar();} }><Link style={{textDecoration: 'none'}} to ='/'>Trang chủ</Link>{menu==="home"? <hr/>:<></>}</a>
        <a onClick={()=> {setMenu("product"); showNavbar();}}><Link style={{textDecoration: 'none'}} to ='/Product'>Thực đơn</Link>{menu==="product"? <hr/>:<></>}</a>
        <a onClick={()=> {setMenu("about"); showNavbar();}}><Link style={{textDecoration: 'none'}} to ='/About'>Về chúng tôi</Link>{menu==="about"? <hr/>:<></>}</a>
        <a onClick={()=> {setMenu("picture"); showNavbar();}}><Link style={{textDecoration: 'none'}} to ='/Picture'>Hình ảnh</Link>{menu==="picture"? <hr/>:<></>}</a>
        <a onClick={()=> {setMenu("contact"); showNavbar();}}><Link style={{textDecoration: 'none'}} to ='/Contact'>Liên hệ</Link>{menu==="contact"? <hr/>:<></>}</a>
        <div className='nav-login-button'>
          <Link to ='/LoginSignup' style={{textDecoration: 'none'}}><button onClick={()=> {setMenu("login"); showNavbar();}}>Đăng nhập</button></Link>
        </div>
      </nav>
      <span className="navbar-toggle-icon" onClick={showNavbar}>&#9776;</span>
    </div>
  )
}

export default Navbar