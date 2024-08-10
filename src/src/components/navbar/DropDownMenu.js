import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser } from '../../server/auth';
import './DropDownMenu.css';
import noavatar from "../assets/noavatar.png";

const DropdownMenu = ({ user }) => {
  const [avatar, setAvatar] = useState(null); // Initial state is null, indicating no image loaded yet
  const [isLoading, setIsLoading] = useState(true); // Loading state to control rendering
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const userAvatar = user?.userData?.imageUrl;

    if (userAvatar) {
      // Preload the avatar image
      const img = new Image();
      img.src = userAvatar;
      img.onload = () => {
        setAvatar(userAvatar); // Set the avatar after it's loaded
        setIsLoading(false); // Indicate that loading is complete
      };
      img.onerror = () => {
        setAvatar(noavatar); // Set the default avatar if the image fails to load
        setIsLoading(false); // Indicate that loading is complete even if there's an error
      };
    } else {
      setAvatar(noavatar); // Set the default avatar if no user avatar is provided
      setIsLoading(false); // Indicate that loading is complete
    }
  }, [user]);

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

  if (isLoading) {
    // Render a loading spinner or some placeholder content while loading
    return <div>Loading...</div>;
  }

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <img
          src={avatar}
          alt="User Avatar"
          className="user-avatar"
        />
      </button>
      {isOpen && (
        <div className="dropdown-menu show">
          <Link to="/Profile" className="dropdown-item">Tài khoản</Link>
          {user?.userData?.role === 'Admin' && (
            <Link to="/Admin" className="dropdown-item">Quyền admin</Link>
          )}
          {/* New Customer Support Section */}
          <Link to="/chatbot" className="dropdown-item">Hỗ trợ khách hàng</Link>
          <button onClick={handleLogout} className="dropdown-item">Đăng xuất</button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
