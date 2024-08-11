import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { checkAuthState } from '../../server/auth';
import DropdownMenu from './DropDownMenu';
import SearchBar from '../searchBar/searchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
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
        {/* New Customer Support Section */}
        <li onClick={() => handleMenuClick('support')}>
          <Link style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/chatbot">Hỗ trợ khách hàng</Link>
          {menu === 'support' && <hr />}
        </li>
        <li>
          <Link to="/Cart" style={{ textDecoration: 'none', border: 'none' }} aria-label="Cart">
          <FontAwesomeIcon icon={faShoppingCart} style={{ color: '#f6edd9', fontSize: '28px' }} />
          </Link>
        </li>
        <div>
          {user ? (
            <DropdownMenu user={user} />
          ) : (
            <Link className="nav-login-button" to="/LoginSignup" aria-label="Login" style={{ textDecoration: 'none' }}>
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
