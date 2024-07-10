import React, { useState } from 'react';
import '../pages/css/ChangeProfile.css';
import { Link } from 'react-router-dom';

const ChangeProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNum, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const isFormValid = firstName && lastName && gender && dob && phoneNum && address;

  return (
    <div className='change-profile'>
      <div className='changeProfile-container'>
        <h1>Đăng kí người dùng</h1>
        <div className='changeProfile-fields'>
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
              <option value=''>Chọn giới tính</option>
              <option value='male'>Nam</option>
              <option value='female'>Nữ</option>
              <option value='other'>Khác</option>
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
        </div>
        <button className='button' disabled={!isFormValid}>
          <Link to={isFormValid ? '/' : '#'}>
            Đăng ký
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ChangeProfile;
