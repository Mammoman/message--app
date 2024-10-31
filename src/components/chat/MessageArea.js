import React from 'react';
import { faSearch, faPhone, faEllipsisV, faPlus, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import '../../styles/chat/MessageArea.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
              <button className="action-btn  search-ma-btn"><FontAwesomeIcon icon={faSearch}/></button>
              <button className="action-btn"><FontAwesomeIcon icon={faPhone} className='phone-ma-btn'/></button>
              <button className="action-btn"><FontAwesomeIcon icon={faEllipsisV} className='ellipsisV-ma-btn'/></button>
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
            <div></div>
          </div>
          <div className="message-box">
            <button className="action-btn plus-btn"><FontAwesomeIcon icon={faPlus} /></button>
            <input type="text" placeholder="Type a message..." className="message-input" />
            <button className="action-btn microphone-btn"><FontAwesomeIcon icon={faMicrophone} /></button>
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