import React, { useState } from 'react'
import './css/LoginSignup.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook} from '@fortawesome/free-brands-svg-icons'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'

const LoginSignup = () => {
  const [username, setUsername] =useState("");
  const [password, setPassword] =useState("");
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false); // Revert state back to false after 1 second
    }, 1000);
  };
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
        <p className='loginsignup-signup'>Chưa có tài khoản?
          <span
            onClick={handleClick}
            style={{
            color: clicked ? 'red' : 'blue', 
            cursor: 'pointer',
            textDecoration: clicked ? 'underline' : 'none',}}
          >
            <Link to ='/Signup'>
              Đăng ký ngay.
            </Link>
          </span>
        </p>
        <hr/>
        <div className ='Single-col Social-icon d-flex justify-content-evenly'>
          <a href='https://facebook.com'>
            <FontAwesomeIcon icon={faFacebook}/>
          </a>
          <a href="https://accounts.google.com/v3/signin/identifier?ifkv=AS5LTAQAENxTNFn3gJP6nRmUm2JlIXr00NxQl75mDr_p_6sm-uwxipsf1aWvpU68rvMgAqe6NAQMXQ&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S487526773%3A1719743936592090&ddm=0">
            <FontAwesomeIcon icon ={faGoogle}/>        
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
