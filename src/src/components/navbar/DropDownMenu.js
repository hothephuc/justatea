import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser } from '../../server/auth';
import "./DropDownMenu.css";

const DropdownMenu = ({ user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;
      console.log(newIsOpen);
      return newIsOpen;
    });
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {user.address} 
      </button>
      {isOpen && (
        <div className="dropdown-menu show">
          <Link to="/Profile" className="dropdown-item">Profile</Link>
          <button onClick={handleLogout} className="dropdown-item">Đăng xuất</button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
