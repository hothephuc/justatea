import React, {useState} from 'react'
import "./Navbar.css"
import logo from '../assets/logo.png'
import menu_bar from '../assets/menu-bar.png'

const Navbar= () => {
    const [menu,setMenu] = useState("home");
  return (
    <>
        <nav className="navbar">
            <div className='nav-logo'>
              <img src={logo} alt=""/>
            </div>
            <ul className='nav-menu'>
              <li onClick={()=> setMenu("Home")}><link to='/'>Trang chủ</link>{menu==="home"? <hr/>:<></>}</li>
              <li onClick={()=> setMenu("Product")}><link to ='/Product'>Thực đơn</link>{menu==="Product"? <hr/>:<></>}</li>
              <li onClick={()=> setMenu("About")}><link to ='/About'>Về chúng tôi</link>{menu==="About"? <hr/>:<></>}</li>
              <li onClick={()=> setMenu("Picture")}><link to ='/Picture'>Hình ảnh</link>{menu==="Picture"? <hr/>:<></>}</li>
              <li onClick={()=> setMenu("Contact")}><link to ='/Contact'>Liên hệ</link>{menu==="Contact"? <hr/>:<></>}</li>
            </ul>
            <div className='nav-login-button'>
              <button><link to ='/LoginSignup'>Đăng nhập</link></button>
            </div>
        </nav>
    </>
  )
}

export default Navbar