import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import '../Styles/UserMessages.css';
import { FaMicrophone, FaPaperPlane, FaPhone, FaVideo, FaPlus } from 'react-icons/fa6';

const socket = io('http://localhost:3000');

const UserMessages = ({ user }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages from server and handle socket connection
  }, []);

  return (
    <div className="user-messages-container">
      <div className="chat-sidebar">
        <div className="user-header">
          <h2>All Chats</h2>
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="chat-list">
          {/* Map through users and display */}
        </div>
      </div>
      
      <div className="chat-main">
        <div className="user-header">
          <h2>{user.name}</h2>
          <div className="header-icons">
            <FaPhone className="icon" />
            <FaVideo className="icon" />
            <FaPlus className="icon plus-icon" />
          </div>
        </div>
        
        <div className="messages">
          {/* Map through messages and display */}
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sent ? 'sent' : 'received'}`}>
              <p>{msg.text}</p>
              <span className="time">{msg.time}</span>
            </div>
          ))}
        </div>
        
        <div className="input-container">
          <input type="text" placeholder="Your message" />
          <FaMicrophone className="icon" />
          <FaPaperPlane className="icon" />
        </div>
      </div>
      
      <div className="chat-details">
        <h3>Chat Details</h3>
        {/* Additional details like shared files, links, etc. */}
      </div>
    </div>
  );
};

export default UserMessages;
