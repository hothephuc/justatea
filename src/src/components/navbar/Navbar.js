import React, {useState} from 'react'
import "./Navbar.css"
import logo from '../assets/logo.png'
import menu_bar from '../assets/menu-bar.png'
import { Link } from 'react-router-dom'

const Navbar= () => {
  const [menu,setMenu] = useState("home");
  return (
    <div className="navbar">
      <div className='nav-logo'>
        <img src={logo} alt=""/>
        <p>JustaTea</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={()=> {setMenu("home")}}><Link style={{textDecoration: 'none'}} to='/'>Trang chủ</Link>{menu==="home"? <hr/>:<></>}</li>
        <li onClick={()=> {setMenu("product")}}><Link style={{textDecoration: 'none'}} to ='/Product'>Thực đơn</Link>{menu==="product"? <hr/>:<></>}</li>
        <li onClick={()=> {setMenu("about")}}><Link style={{textDecoration: 'none'}} to ='/About'>Về chúng tôi</Link>{menu==="about"? <hr/>:<></>}</li>
        <li onClick={()=> {setMenu("picture")}}><Link style={{textDecoration: 'none'}} to ='/Picture'>Hình ảnh</Link>{menu==="picture"? <hr/>:<></>}</li>
        <li onClick={()=> {setMenu("contact")}}><Link style={{textDecoration: 'none'}} to ='/Contact'>Liên hệ</Link>{menu==="contact"? <hr/>:<></>}</li>
      </ul>
      <div className='nav-login-button'>
        <Link to ='/LoginSignup'><button onClick={()=> {setMenu("login")}}>Đăng nhập</button></Link>
      </div>
    </div>
  )
}

export default Navbar