import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { checkAuthState } from '../../server/auth';
import DropdownMenu from './DropDownMenu';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const [user, setUser] = useState(null);
  const navRef = useRef();
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive-nav');
  };

  useEffect(() => {
    checkAuthState().then((authState) => {
      if (authState) {
        setUser(authState.user);
        console.log("user online");
      } else {
        setUser(null);
      }
    }).catch((error) => {
      console.error('Error checking auth state:', error);
    });
  }, []);

  return (
    <div className="navbar">
      <ul className="nav-menu" ref={navRef}>
        <div className="nav-logo">
          <Link to='/' style={{ textDecoration: 'none', border: 'none', display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="JustaTea Logo" className="nav-logo-img" />
            <p>JustaTea</p>
          </Link>
        </div>
        <li onClick={() => { setMenu('home'); showNavbar(); }}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/">Trang chủ</Link>
          {menu === 'home' ? <hr /> : null}
        </li>
        <li onClick={() => { setMenu('product'); showNavbar(); }}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/Menu">Thực đơn</Link>
          {menu === 'product' ? <hr /> : null}
        </li>
        <li onClick={() => { setMenu('about'); showNavbar(); }}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/About">Về chúng tôi</Link>
          {menu === 'about' ? <hr /> : null}
        </li>
        <li onClick={() => { setMenu('picture'); showNavbar(); }}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/Picture">Hình ảnh</Link>
          {menu === 'picture' ? <hr /> : null}
        </li>
        <li onClick={() => { setMenu('contact'); showNavbar(); }}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/Contact">Liên hệ</Link>
          {menu === 'contact' ? <hr /> : null}
        </li>
        <div className="nav-login-button">
          {user ? (
            <DropdownMenu user={user} />
          ) : (

            <Link to="/LoginSignup" aria-label="Login">
              <button onClick={() => { setMenu('login'); showNavbar(); }}>Đăng nhập</button>
            </Link>

          )}
        </div>
      </ul>
      <span className="navbar-toggle-icon" onClick={showNavbar} aria-label="Toggle Navigation">&#9776;</span>
    </div>
  );
};

export default Navbar;
