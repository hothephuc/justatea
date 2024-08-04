import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser, checkAuthState } from '../../server/auth';
import { getUserDocument } from '../../server/data-handle';
import './DropDownMenu.css';
import noavatar from "../assets/noavatar.png";

const DropdownMenu = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authState = await checkAuthState();
        if (authState && authState.user) {
          const uid = authState.user.uid;
          const fetchedUserData = await getUserDocument(uid);
          if (fetchedUserData) {
            setUserData(fetchedUserData); // Save user data
          } else {
            console.error('No user data found');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
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
        <img
          src={userData && userData.imageUrl ? userData.imageUrl : noavatar}
          alt="User Avatar"
          className="user-avatar"
        />
      </button>
      {isOpen && (
        <div className="dropdown-menu show">
          <Link to="/Profile" className="dropdown-item">Tài khoản</Link>
          {userData && userData.role === 'Admin' && (
            <Link to="/Admin" className="dropdown-item">Quyền admin</Link>
          )}
          <button onClick={handleLogout} className="dropdown-item">Đăng xuất</button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
