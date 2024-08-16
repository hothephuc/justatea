import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './css/Ordered.css'

const Ordered = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const orderId = query.get('orderId');
    const amount = query.get('amount');

  return (
    <div className='ordered'>
        <h1>Đơn hàng của bạn đã được đặt và đang chờ xử lý</h1>
        <img src="https://i.pinimg.com/564x/4a/34/34/4a34348e76c2a7bb7b1b62d9d998c6ab.jpg" alt=""/>
        <p>Cảm ơn vì đã ủng hộ chúng tôi. Hy vọng có thế được gặp lại bạn.</p>
        <p style={{fontSize: '16px'}}>Mã đơn hàng: {orderId}</p>
        <Link to='/'>
        <button>Trở về trang chủ</button>
        </Link>
    </div>
  )
}

export default Ordered