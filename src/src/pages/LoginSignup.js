import React, { useState } from 'react';
import './css/LoginSignup.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signInGoogle, resetPassword } from '../server/auth';

const LoginSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  const handleLogin = () => {
    // Giả sử đây là hàm kiểm tra đăng nhập
    if (username === "correctUsername" && password === "correctPassword") {
      setErrorMessage("");
      // Xử lý đăng nhập thành công
    } else {
      setErrorMessage("Sai tên tài khoản hoặc mật khẩu.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      console.log('Google sign-in successful');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await resetPassword(resetEmail);
      console.log('Password reset email sent successfully');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <div className={`loginsignup ${showResetPassword ? 'expanded' : ''}`}>
      <div className='loginsignup-container'>
        <h1>Đăng nhập</h1>
        <div className='loginsignup-fields'>
          <input 
            type="text" 
            placeholder='Tên tài khoản'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input 
            type="password" 
            placeholder='Mật khẩu'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button 
          className={username && password ? "active" : ""}
          onClick={handleLogin}
        >
          Đăng nhập
        </button>
        {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
        <p className='loginsignup-signup'>Chưa có tài khoản?
          <span
            onClick={handleClick}
            style={{
              color: clicked ? 'red' : 'blue', 
              cursor: 'pointer',
              textDecoration: clicked ? 'underline' : 'none',
            }}
          >
            <Link to='/Signup'>
              Đăng ký ngay.
            </Link>
          </span>
        </p>
        <p className='loginsignup-forgot-password'>
          Quên mật khẩu?
          <span
            onClick={() => setShowResetPassword(!showResetPassword)}
            style={{
              color: showResetPassword ? 'red' : 'blue', 
              cursor: 'pointer',
              textDecoration: showResetPassword ? 'underline' : 'none',
            }}
          >
            Nhấp vào đây.
          </span>
        </p>
        {showResetPassword && (
          <div className='reset-password-field'>
            <input 
              type="email" 
              placeholder='Email'
              value={resetEmail}
              onChange={(event) => setResetEmail(event.target.value)}
            />
            <button onClick={handlePasswordReset}>
              Đặt lại mật khẩu
            </button>
          </div>
        )}
        <hr/>
        <div className='Single-col Social-icon d-flex justify-content-evenly'>
          <div onClick={() => window.location.href = 'https://facebook.com'}>
            <FontAwesomeIcon icon={faFacebook} />
          </div>
          <div onClick={handleGoogleSignIn}>
            <Link to='/ChangeProfile'>
              <FontAwesomeIcon icon={faGoogle} />
            </Link>
          </div>   
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
