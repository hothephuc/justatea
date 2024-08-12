import React from 'react';
import './Footer.css';
import logo from '../assets/logo.png';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-logo'>
        <img src={logo} alt="JustaTea logo" />
        <p>JustaTea</p>
      </div>
      <hr />
      <div className='footer-content'>
        <div className='footer-about'>
          <h1>Về chúng tôi</h1>
          <p>Trang web chính thức của quán cà phê JustaTea, thiết kế bởi JustaTea Team,
             nơi bạn có thể khám phá và thưởng thức các loại đồ uống thơm ngon nhất.</p>
        </div>
        <div className='footer-contact'>
          <h1>Liên hệ</h1>
          <p>Địa chỉ: 227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh</p>
          <p>Điện thoại: 0901931656</p>
          <p>Email: TranBinhPhuocViet@gmail.com</p>
        </div>
        <div className='footer-social'>
          <h1>Mạng xã hội</h1>
          <a href="https://www.facebook.com/dean.micheal.988" target="_blank" rel="noopener noreferrer">
            <FaFacebook /> https://www.facebook.com/dean.micheal.988
          </a>
          <a href="https://x.com/Ghoskios" target="_blank" rel="noopener noreferrer">
            <FaTwitter /> https://x.com/Ghoskios
          </a>
          <a href="https://www.instagram.com/for_everyoung10/" target="_blank" rel="noopener noreferrer">
            <FaInstagram /> https://www.instagram.com/for_everyoung10/
          </a>
        </div>
      </div>
      <div className='footer-quote'>
        <p>More than just a tee, it's an attitude</p>
      </div>
    </div>
  );
}

export default Footer;
