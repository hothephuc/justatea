import React, { useState } from 'react';
import './css/LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signInGoogle, resetPassword, signInEmail } from '../server/auth';
import { MDBInput } from 'mdb-react-ui-kit';

const LoginSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const [resetEmail, setResetEmail] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  const handleLogin = async () => {
    try {
      await signInEmail(username, password);
      console.log('Sign in successful');
      navigate('/');
      window.location.reload(); 
    } catch (error) {
      setErrorMessage('Email hoặc mật khẩu không đúng');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const googleUser = await signInGoogle();
      console.log('Google sign-in successful');
      console.log(googleUser);

      if (googleUser.phone === "") {
        navigate('/ChangeProfile');
        window.location.reload();
      } else {
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setErrorMessage('Không thể đăng nhập bằng google');
    }
  };

  const handlePasswordReset = async () => {
    try {
      await resetPassword(resetEmail);
      console.log('Password reset email sent successfully');
      setSuccessMessage('Đã gửi email đặt lại mật khẩu thành công');
      setErrorMessage("");
      setResetEmail(""); // Clear the reset email field

      // Reload the page after 5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 5000); // 5000 milliseconds = 5 seconds

    } catch (error) {
      console.error('Error sending password reset email:', error);
      setErrorMessage('Email đăng nhập không đúng.');
      setSuccessMessage("");
    }
  };

  return (
    <div className={`loginsignup ${showResetPassword ? 'expanded' : ''}`}>
      <div className='loginsignup-container'>
        {showResetPassword ? (
          <div className='reset-password-field'>
            <h1>Đặt lại mật khẩu</h1>
            <label>Nhập email của bạn</label>
            <input 
              type='email' 
              placeholder='Email'
              value={resetEmail}
              onChange={(event) => setResetEmail(event.target.value)}
            />
            <button onClick={handlePasswordReset} disabled={!resetEmail}>
              Đặt lại mật khẩu
            </button>
            {successMessage && <p className="success-message" style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        ) : (
          <>
            <h1>Đăng nhập</h1>
            <div className='loginsignup-fields'>
              <label>Email</label>
              <input 
                type="email" 
                placeholder='Email'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <label>Mật khẩu</label>
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
            <p className='loginsignup-options'>
              <span
                onClick={handleClick}
                style={{
                  color:  'blue',
                  cursor: 'pointer',
                  textDecoration: clicked ? 'underline' : 'none',
                }}
              >
                <Link to='/Signup'>Chưa có tài khoản?</Link>
              </span>
              <span
                onClick={() => setShowResetPassword(!showResetPassword)}
                style={{
                  color: 'blue',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Quên mật khẩu?
              </span>
            </p>
          </>
        )}
        {!showResetPassword && (
          <div className="hr-text">Hoặc</div>
        )}
        {!showResetPassword && (
          <div className='Single-col Social-icon d-flex justify-content-evenly'>
            <div onClick={handleGoogleSignIn}>
              <FontAwesomeIcon icon={faGoogle} />
            </div>   
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
