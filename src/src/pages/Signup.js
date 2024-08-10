import React, { useState } from 'react';
import './css/Signup.css';
import { Link } from 'react-router-dom';
import { registerEmail } from '../server/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {  
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNum, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [clicked, setClicked] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const isFormValid = username && password && (password === confirmedPassword) 
                      && fullname  && dob && phoneNum && address
                      && !passwordError && !confirmPasswordError && !emailError;

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);

    // Email validation logic
    if (!newUsername.includes('@')) {
      setEmailError("Email phải có dấu @.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Password validation logic
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordPattern.test(newPassword)) {
      setPasswordError("Mật khẩu phải có đủ 6 chữ số và có ít nhất một chữ hoa, một chữ thường và một số.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmedPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmPasswordError("Mật khẩu nhập lại không khớp.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false); // Revert state back to false after 1 second
    }, 1000);
  };

  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent form submission
    if (!isFormValid){
      console.log("Form is invalid!")
      return; // Ensure form is valid before proceeding
    }
    // Prepare user info object
    const userInfo = {
      name: fullname,
      dob: dob,
      gender: gender,
      email: username,
      phone: phoneNum,
      add: address,
      // Add more fields as needed
    };
    
    try {
      // Call registerEmail function
      const newUser = await registerEmail(username, password, userInfo);
      console.log("User registered successfully:", newUser);
      navigate('/');
    } catch (error) {
      console.error("Error registering user:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='Signup'>
      <div className='signup-container'>
        <h1>Đăng kí người dùng</h1>
        <div className='signup-fields'>
          <div className='name-fields'>
            <div>
              <label>Họ và Tên</label>
              <input
                type='text'
                placeholder='Họ và tên'
                value={fullname}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>
          </div>
          <label>Giới tính</label>
          <div className='gender_options'>
            <select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              className='gender_dropdown'
            >
              <option value=''>Chọn giới tính</option>
              <option value='Nam'>Nam</option>
              <option value='Nữ'>Nữ</option>
              <option value='Khác'>Khác</option>
            </select>
          </div>
          <label>Ngày tháng năm sinh</label>
          <input
            type='date'
            value={dob}
            onChange={(event) => setDob(event.target.value)}
            className='dob'
          />
          <label>Số điện thoại</label>
          <input
            type='text'
            placeholder='Số điện thoại'
            value={phoneNum}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <label>Địa chỉ</label>
          <input
            type='text'
            placeholder='Địa chỉ'
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <label>Email</label>
          <input
            type='email'
            placeholder='Email'
            value={username}
            onChange={handleUsernameChange}
          />
          {emailError && <p className='error'>{emailError}</p>}
          <label>Mật khẩu</label>
          <input
            type='password'
            placeholder='Mật khẩu'
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className='error'>{passwordError}</p>}
          <label>Nhập lại mật khẩu</label>
          <input
            type='password'
            placeholder='Nhập lại mật khẩu'
            value={confirmedPassword}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPasswordError && <p className='error'>{confirmPasswordError}</p>}
        </div>
        <button 
          className={isFormValid ? "active" : ""}
          disabled={!isFormValid}
          onClick={handleSignup}
        >
          Đăng ký
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className='signup-login'>Đã có tài khoản?
        <span
          onClick={handleClick}
          style={{
            color: clicked ? 'red' : 'blue',
            cursor: 'pointer',
            textDecoration: clicked ? 'underline' : 'none',
          }}
        >
          <Link to='/LoginSignup'>
            Đăng nhập ngay.
          </Link>
        </span>
      </p>
      </div>
    </div>
  );
};

export default Signup;
