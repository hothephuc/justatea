import React, { useState, useRef } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive-nav');
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>JustaTea</p>
      </div>
      <ul className="nav-menu" ref={navRef}>
        <div className="responsive-nav-logo">
          <img src={logo} alt="JustaTea Logo" />
        </div>
        <li onClick={() => { setMenu('home'); showNavbar(); }}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/">Trang chủ</Link>
          {menu === 'home' ? <hr/> : null}
        </li>
        <li onClick={() => { setMenu('product'); showNavbar(); }}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/Menu">Thực đơn</Link>
          {menu === 'product' ? <hr/> : null}
        </li>
        <li onClick={() => { setMenu('about'); showNavbar(); }}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/About">Về chúng tôi</Link>
          {menu === 'about' ? <hr/> : null}
        </li>
        <li onClick={() => { setMenu('picture'); showNavbar(); }}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/Picture">Hình ảnh</Link>
          {menu === 'picture' ? <hr/> : null}
        </li>
        <li onClick={() => { setMenu('contact'); showNavbar(); }}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/Contact">Liên hệ</Link>
          {menu === 'contact' ? <hr/> : null}
        </li>
        <div className="nav-login-button">
          <Link to="/LoginSignup" style={{ textDecoration: 'none' }}>
            <button onClick={() => { setMenu('login'); showNavbar(); }}>Đăng nhập</button>
          </Link>
        </div>
      </ul>
      <span className="navbar-toggle-icon" onClick={showNavbar}>&#9776;</span>
    </div>
  );
};

export default Navbar;
