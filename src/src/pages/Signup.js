import React, { useState } from 'react';
import './css/Signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNum, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [clicked, setClicked] = useState(false);

  const isFormValid = username && password && (password === confirmedPassword) 
                      && firstName && lastName && gender && dob && phoneNum && address;

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false); // Revert state back to false after 1 second
    }, 1000);
  };

  return (
    <div className='Signup'>
      <div className='signup-container'>
        <h1>Đăng kí người dùng</h1>
        <div className='signup-fields'>
          <div className='name-fields'>
            <div>
              <label>Họ</label>
              <input
                type='text'
                placeholder='Họ'
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div>
              <label>Tên</label>
              <input
                type='text'
                placeholder='Tên'
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>
          <label>Giới</label>
          <div className='gender_options'>
            <select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              className='gender_dropdown'
            >
              <option value='male'>Nam</option>
              <option value='female'>Nữ</option>
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
            type='number'
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
          <label>Tên tài khoản</label>
          <input
            type='text'
            placeholder='Tên tài khoản'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label>Mật khẩu</label>
          <input
            type='password'
            placeholder='Mật khẩu'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label>Nhập lại mật khẩu</label>
          <input
            type='password'
            placeholder='Nhập lại mật khẩu'
            value={confirmedPassword}
            onChange={(event) => setConfirmedPassword(event.target.value)}
          />
      </div>
        <button className={isFormValid ? "active" : ""}
          disabled={!isFormValid}
        >
          <Link to='/'>
                Đăng ký
          </Link>
        </button>
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
