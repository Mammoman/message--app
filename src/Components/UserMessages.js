import React, { useState, useEffect } from 'react';
import '../Styles/UserMessages.css';
import { FaMicrophone, FaPaperPlane, FaPhone, FaVideo, FaPlus } from 'react-icons/fa6';
import { auth } from '../firebase';
import Messages from './Messages';

const UserMessages = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const messagesInstance = React.useRef(new Messages());

  useEffect(() => {
    const messages = messagesInstance.current;
    
    messages.addListener('messages', setMessages);
    messages.initialize(user.id, auth.currentUser?.uid);

    return () => {
      messages.cleanup();
      messages.removeListener('messages', setMessages);
    };
  }, [user.id]);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      try {
        await messagesInstance.current.sendMessage(inputMessage);
        setInputMessage('');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div>Error: {error}</div>;

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

      <FaPlus className="icon plus-icon" />

        <input 
          type="text" 
          placeholder="Enter your message" 
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        
        <FaMicrophone className="icon" />
        {/* <FaPaperPlane className="icon" onClick={handleSendMessage} /> */}
      </div>
    </div>
    </div>
  );
}

export default UserMessages;