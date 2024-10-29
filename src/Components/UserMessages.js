import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import '../Styles/UserMessages.css';
import { FaMicrophone, FaPaperPlane, FaPhone, FaVideo, FaPlus } from 'react-icons/fa6';

const socket = io('http://localhost:3000');

const UserMessages = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Fetch messages from server and handle socket connection
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Handle sending message
      setInputMessage('');
    }
  };

  return (
    <div className='main-container'>
    <div className="messages-wrapper">
      <div className="messages-header">
        <div className="user-info">
        <div className="user-avatar">
  {user.avatar ? (
    typeof user.avatar === 'string' && user.avatar.length === 1 ? (
      <div className="avatar-letter">{user.avatar}</div>
    ) : (
      <img src={user.avatar} alt={user.name} className="avatar-image" />
    )
  ) : (
    <div className="avatar-placeholder"></div>
  )}
  {user.isOnline && <div className="status online"></div>}
</div>
          <h2>{user.name}</h2>
        </div>
        <div className="header-icons">
          <FaPhone className="icon" />
          <FaVideo className="icon" />
          <FaPlus className="icon plus-icon" />
        </div>
      </div>
      
      <div className="messages-content">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sent ? 'sent' : 'received'}`}>
            <p>{msg.text}</p>
            <span className="time">{msg.time}</span>
          </div>
        ))}
      </div>
      
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Enter your message" 
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <FaMicrophone className="icon" />
        <FaPaperPlane className="icon" onClick={handleSendMessage} />
      </div>
    </div>
    </div>
  );
}

export default UserMessages;