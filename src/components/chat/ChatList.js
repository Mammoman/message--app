import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../../styles/chat/ChatList.css';

const ChatList = ({ users, quickAccess, selectedUser, onSelectUser }) => {
  return (
    
    


    <div className="chat-list-container">
      <div className='user-info'  >
        <img src='pathavata' alt='imm' className='us-avata'/>
        <span>vinkag gog</span>

      </div>
      <div className="chat-list-header">
        <h2>Design chat</h2>
        <p>23 members, 10 online</p>
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="messages-section">
        {users.map(user => (
          <div 
            key={user.id} 
            className={`chat-item ${selectedUser?.id === user.id ? 'active' : ''}`}
            onClick={() => onSelectUser(user)}
          >
            <div className="chat-avatar">
              <img src={user.avatar} alt="" className="avatar-image" />
              <div className={`status ${user.isOnline ? 'online' : ''}`}></div>
            </div>
            <div className="chat-info">
              <div className="chat-header">
                <h4>{user.name}</h4>
                <span className="time">{user.time}</span>
              </div>
              <div className="chat-message">
                <p>{user.message}</p>
                {user.pinned && <span className="pin-icon">📌</span>}
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