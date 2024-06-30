import React,{ useState } from 'react'
import './css/Signup.css'
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [confirmedPassword,setConfirmedPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const isFormValid = username && password && (password === confirmedPassword);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false); // Revert state back to false after 1 second
    }, 1000);
  };

  return (
    <div className='Signup'>
      <div className ='signup-container'>
        <h1>Đăng kí người dùng</h1>
        <div className ='signup-fields'>
          <input
            type = 'text'
            placeholder ='Tên tài khoản hoặc số điện thoại'
            value = {username}
            onChange = {(event)=> setUsername(event.target.value)}
          />
          <input
            type ='password'
            placeholder ='Mật khẩu'
            value ={password}
            onChange ={(event)=> setPassword(event.target.value)}
          />
          <input
            type ='confirmedPassword'
            placeholder = 'Nhập lại mật khẩu'
            value = {confirmedPassword}
            onChange = {(event)=>setConfirmedPassword(event.target.value)}
          />
        </div>
        <button className={isFormValid ? "active" : ""}
          disabled={!isFormValid} 
        >
          Đăng ký
        </button>
        <p className='signup-login'>Đã có tài khoản?
        <span
          onClick={handleClick}
          style={{
          color: clicked ? 'red' : 'blue', 
          cursor: 'pointer',
          textDecoration: clicked ? 'underline' : 'none',}}
        >
          <Link to ='/LoginSignup'>
            Đăng nhập ngay.
          </Link>
        </span>
        </p>
      </div>
    </div>
  )
}

export default Signup
