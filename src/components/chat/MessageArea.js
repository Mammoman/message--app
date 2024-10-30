import React from 'react';
import { FaSearch, FaPhone, FaEllipsisV } from 'react-icons/fa';
import '../../styles/chat/MessageArea.css';

const MessageArea = ({ selectedUser }) => {
  return (
    <div className="message-area">
      {selectedUser ? (
        <>
          <div className="message-header">
            <div className="user-info">
              <div className="chat-avatar">
                <img src={selectedUser.avatar} alt="" className="avatar-image" />
                <div className={`status ${selectedUser.isOnline ? 'online' : ''}`}></div>
              </div>
              <div className="user-details">
                <h2>{selectedUser.name}</h2>
                <span className="members-count">23 members, 10 online</span>
              </div>
            </div>
            <div className="header-actions">
              <button className="action-btn  search-ma-btn"><FaSearch/></button>
              <button className="action-btn"><FaPhone  className='phone-ma-btn'/></button>
              <button className="action-btn"><FaEllipsisV className='ellipsisV-ma-btn'/></button>
            </div>
          </div>
          <div className="message-content">
            {selectedUser.messages?.map((message, index) => (
              <div key={index} className={`message ${message.isSent ? 'sent' : 'received'}`}>
                <div className="message-bubble">
                  <p>{message.text}</p>
                  <span className="time">{message.time}</span>
                </div>
                {message.reactions && (
                  <div className="message-reactions">
                    {message.reactions.map((reaction, i) => (
                      <span key={i} className="reaction">{reaction}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-chat-selected">
          <p>Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default MessageArea;