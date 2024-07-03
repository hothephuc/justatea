import React, { useState } from 'react'
import './css/LoginSignup.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook} from '@fortawesome/free-brands-svg-icons'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
//import { signInGoogle,registerEmail,signInEmail } from '../server/auth.js';
import { signInGoogle } from '../server/auth';
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
  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      console.log('Google sign-in successful');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
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
          <button onClick={handleGoogleSignIn} className="btn btn-link">
            <FontAwesomeIcon icon={faGoogle} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
