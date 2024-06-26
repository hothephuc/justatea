import React, { useState } from 'react'
import './css/LoginSignup.css'

const LoginSignup = () => {
  const [username, setUsername] =useState("");
  const [password, setPassword] =useState("");
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Đăng nhập</h1>
        <div className='loginsignup-fields'>
          <input 
            type="text" 
            placeholder='Tên tài khoản'
            value={username}
            onChange={(event)=> setUsername(event.target.value)}
          />
          <input 
            type="password" 
            placeholder='Mật khẩu'
            value={password}
            onChange={(event)=> setPassword(event.target.value)}
          />
        </div>
        <button className={username && password ? "active":""}>Đăng nhập</button>
        <p className='loginsignup-signup'>Chưa có tài khoản? <span>Đăng ký ngay.</span></p>
      </div>
    </div>
  )
}

export default LoginSignup
