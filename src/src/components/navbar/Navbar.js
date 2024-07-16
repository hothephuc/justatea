import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser, checkAuthState} from '../../server/auth'; 

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
        console.log("user online")
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
      await signOutUser();
      setUser(null);
      navigate('/'); 
      window.location.reload(); 
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
