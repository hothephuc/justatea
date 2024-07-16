import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { checkAuthState } from './yourAuthUtils';  // Import hàm kiểm tra trạng thái đăng nhập
import { signOutUser } from './yourSignOutUtils';  // Import hàm đăng xuất người dùng

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const [user, setUser] = useState(null);  // State để lưu thông tin người dùng
  const navRef = useRef();
  const navigate = useNavigate();  // Hook để điều hướng sau khi đăng xuất

  // Hiển thị hoặc ẩn navbar responsive
  const showNavbar = () => {
    navRef.current.classList.toggle('responsive-nav');
  };

  // Kiểm tra trạng thái đăng nhập khi component được mount
  useEffect(() => {
    checkAuthState().then((authState) => {
      if (authState) {
        setUser(authState.user);
      } else {
        setUser(null);
      }
    }).catch((error) => {
      console.error('Error checking auth state:', error);
    });
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await signOutUser();  // Sử dụng hàm đăng xuất người dùng
      setUser(null);
      navigate('/');  // Điều hướng về trang chủ sau khi đăng xuất
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="JustaTea Logo" />
        <p>JustaTea</p>
      </div>
      <ul className="nav-menu" ref={navRef}>
        <div className="responsive-nav-logo">
          <img src={logo} alt="JustaTea Logo" />
        </div>
        <li onClick={() => { setMenu('home'); showNavbar(); }}>
          <Link to="/" className={menu === 'home' ? 'active' : ''} aria-label="Home">Trang chủ</Link>
          <hr className={menu === 'home' ? 'active' : 'inactive'} />
        </li>
        <li onClick={() => { setMenu('product'); showNavbar(); }}>
          <Link to="/Menu" className={menu === 'product' ? 'active' : ''} aria-label="Menu">Thực đơn</Link>
          <hr className={menu === 'product' ? 'active' : 'inactive'} />
        </li>
        <li onClick={() => { setMenu('about'); showNavbar(); }}>
          <Link to="/About" className={menu === 'about' ? 'active' : ''} aria-label="About Us">Về chúng tôi</Link>
          <hr className={menu === 'about' ? 'active' : 'inactive'} />
        </li>
        <li onClick={() => { setMenu('picture'); showNavbar(); }}>
          <Link to="/Picture" className={menu === 'picture' ? 'active' : ''} aria-label="Pictures">Hình ảnh</Link>
          <hr className={menu === 'picture' ? 'active' : 'inactive'} />
        </li>
        <li onClick={() => { setMenu('contact'); showNavbar(); }}>
          <Link to="/Contact" className={menu === 'contact' ? 'active' : ''} aria-label="Contact">Liên hệ</Link>
          <hr className={menu === 'contact' ? 'active' : 'inactive'} />
        </li>
        <div className="nav-login-button">
          {user ? (
            <button onClick={handleLogout}>Đăng xuất</button>
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
