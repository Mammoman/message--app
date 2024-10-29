import React from 'react';
import { FaComments, FaUsers, FaUserFriends, FaCog, FaShieldAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <FaComments className="sidebar-icon active" />
      </div>
      <div className="nav-icons">
        <FaUsers className="sidebar-icon" />
        <FaUserFriends className="sidebar-icon" />
        <FaCog className="sidebar-icon" />
        <FaShieldAlt className="sidebar-icon" />
      </div>
    </div>
  );
};

export default Sidebar;