import React from 'react';
import { FaSearch } from 'react-icons/fa';

const ChatList = ({ users, quickAccess, selectedUser, onSelectUser }) => {
  return (
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
            onClick={() => onSelectUser(user)}
          >
            <div className="chat-avatar">
              {user.avatar && <img src={user.avatar} alt="" className="avatar-image" />}
              <div className={`status ${user.isOnline ? 'online' : ''}`}></div>
            </div>
            <div className="chat-info">
              <div className="chat-header">
                <h3>{user.name}</h3>
                <span className="time">{user.time}</span>
              </div>
              <div className="chat-mess">
                <p className="last-message">{user.message}</p>
                {user.unread && <div className="unread-badge">{user.unread}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;