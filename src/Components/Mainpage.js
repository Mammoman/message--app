import React, { useState } from 'react';
import { FaSearch, FaUsers, FaComments, FaCog, FaShieldAlt, FaUserFriends } from 'react-icons/fa';
import UserMessages from './UserMessages';
import '../Styles/Mainpage.css';

const Mainpage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  
  const users = [
    { 
      id: 1, 
      name: 'Patrick Hendricks', 
      message: "Hey! there I'm available", 
      time: '05 min',
      avatar: '/path/to/avatar1.jpg',
      isOnline: true 
    },
    { 
      id: 2, 
      name: 'Mark Messer', 
      message: 'Images', 
      time: '12 min',
      avatar: '/path/to/avatar2.jpg',
      isOnline: true,
      unread: 2
    },
    { 
      id: 3, 
      name: 'General', 
      message: 'This theme is awesome!', 
      time: '20 min',
      avatar: 'G',
      isOnline: false 
    },
    { 
      id: 4, 
      name: 'Doris Brown', 
      message: 'Nice to meet you', 
      time: '10:12 AM',
      avatar: '/path/to/avatar3.jpg',
      isOnline: true 
    }
  ];

  const quickAccess = [
    { id: 1, name: 'Patrick', avatar: '/path/to/avatar1.jpg', isOnline: true },
    { id: 2, name: 'Doris', avatar: '/path/to/avatar2.jpg', isOnline: true },
    { id: 3, name: 'Emily', avatar: '/path/to/avatar3.jpg', isOnline: true },
    { id: 4, name: 'Steve', avatar: '/path/to/avatar4.jpg', isOnline: true }
  ];

  return (
    <div className="mainpage-container">
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

      <div className="chat-container">
        <h1>Chats</h1>
        
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search messages or users" />
        </div>

        <div className="quick-access">
          {quickAccess.map(user => (
            <div key={user.id} className="quick-access-item">
              <div className="avatar">
                <div className={`status ${user.isOnline ? 'online' : ''}`}></div>
              </div>
              <span>{user.name}</span>
            </div>
          ))}
        </div>

        <h2>Recent</h2>
        <div className="chat-list">
          {users.map(user => (
            <div 
              key={user.id} 
              className={`chat-item ${selectedUser?.id === user.id ? 'active' : ''}`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="chat-avatar">
                {typeof user.avatar === 'string' && user.avatar.length === 1 ? (
                  <div className="avatar-letter">{user.avatar}</div>
                ) : (
                  <div className="avatar">
                    <div className={`status ${user.isOnline ? 'online' : ''}`}></div>
                  </div>
                )}
              </div>
              <div className="chat-info">
                <div className="chat-header">
                  <h3>{user.name}</h3>
                  <span className="time">{user.time}</span>
                </div>
                <p className="last-message">{user.message}</p>
              </div>
              {user.unread && <div className="unread-badge">{user.unread}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="main-content">
        {selectedUser ? (
          <UserMessages user={selectedUser} />
        ) : (
          <div className="empty-state">
            <p>Select a chat to read messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mainpage;