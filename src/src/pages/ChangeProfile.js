import React, { useState } from 'react';
import '../pages/css/ChangeProfile.css';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth } from 'firebase/auth';
import CustomerController from '../controller/Customer';

const ChangeProfile = () => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNum, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const isFormValid =  fullName && gender && dob && phoneNum && address;

  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user ? user.uid : null;

    if (uid && isFormValid) {
        const userData = {
            name: fullName,
            dob:dob,
            gender:gender,
            email: '',
            phone: phoneNum,
            add: address
        };
        try {
            await CustomerController.updateUserDoc(userData, uid);
            alert('Profile updated successfully!');
            console.log(userData.name)
            console.log(userData.dob)
            console.log(userData.gender)
            console.log(userData.email)
            console.log(userData.phone)
            console.log(userData.add)
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        }
    } else {
        alert('Please fill in all fields and make sure you are logged in.');
    }
};

  return (
    <div className='change-profile'>
      <div className='changeProfile-container'>
        <h1>Nhập thông tin </h1>
        <div className='changeProfile-fields'>
          <div className='name-fields'>
            <div>
              <label>Họ và tên</label>
              <input
                type='text'
                placeholder='Họ và tên'
                value={fullName}
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
        </div>
        <button className='button' disabled={!isFormValid} onClick={handleSubmit}>
            Cập nhật
        </button>
      </div>
    </div>
  );
};

export default ChangeProfile;
