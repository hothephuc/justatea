import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { checkAuthState } from '../../server/auth';
import DropdownMenu from './DropDownMenu';
import SearchBar from '../searchBar/searchBar';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const [user, setUser] = useState(null); // Initially null to handle loading state
  const [loading, setLoading] = useState(true); // Loading state
  const navRef = useRef();
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive-nav');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authState = await checkAuthState();
        console.log('Auth state:', authState);
        if (authState && authState.user) {
          setUser(authState);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchUser();
  }, []);

  const handleSearchSubmit = (searchInput) => {
    const searchUrl = `/menu?query=${searchInput.toLowerCase()}`;
    window.location.href = searchUrl;
  };

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    showNavbar();
  };

  const handleClick = () => {
    setMenu('login');
    showNavbar();
    navigate('/LoginSignup');
  };

  if (loading) {
    // Render a loading screen while waiting for user data
    return <div>Loading...</div>;
  }

  return (
    <div className="navbar">
      <ul className="nav-menu" ref={navRef}>
        <li className="nav-logo">
          <Link to="/" style={{ textDecoration: 'none', border: 'none', display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="JustaTea Logo" className="nav-logo-img" />
            <p>JustaTea</p>
          </Link>
        </li>
        <li>
          <SearchBar onSearchSubmit={handleSearchSubmit} />
        </li>
        <li onClick={() => handleMenuClick('home')}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/">Trang chủ</Link>
          {menu === 'home' && <hr />}
        </li>
        <li onClick={() => handleMenuClick('product')}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/Menu">Thực đơn</Link>
          {menu === 'product' && <hr />}
        </li>
        <li onClick={() => handleMenuClick('about')}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/About">Về chúng tôi</Link>
          {menu === 'about' && <hr />}
        </li>
        <li onClick={() => handleMenuClick('picture')}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/Picture">Hình ảnh</Link>
          {menu === 'picture' && <hr />}
        </li>
        <li onClick={() => handleMenuClick('contact')}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/Contact">Liên hệ</Link>
          {menu === 'contact' && <hr />}
        </li>
        <div>
          {user ? (
            <DropdownMenu user={user} />
          ) : (
            <Link to="/LoginSignup" aria-label="Login">
              <button className="nav-login-button" onClick={() => { setMenu('login'); showNavbar(); }}>Đăng nhập</button>
            </Link>
          )}
        </div>
      </ul>
      <span className="navbar-toggle-icon" onClick={showNavbar} aria-label="Toggle Navigation">&#9776;</span>
    </div>
  );
};

export default Navbar;
