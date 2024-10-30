import React, { useState } from 'react';
import ChatList from './ChatList';
import MessageArea from './MessageArea';
import '../../styles/chat/Chat.css';
import Sidebar from './Sidebar';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  
  const users = [
    { 
      id: 1, 
      name: 'Design chat',
      message: "Jessie Rollins sent...",
      time: '4m',
      avatar: '/path/to/avatar.jpg',
      isOnline: true,
      pinned: true,
      unread: 1,
      messages: [
        {
          text: "I added new flows to our design system. Now you can use them for your projects!",
          time: "09:29",
          isSent: false,
          reactions: ["👍", "4"]
        },
        {
          text: "Hey guys! Important news!",
          time: "09:24",
          isSent: false
        }
      ]
    },
    // Add more test users for scrolling
    {
      id: 2,
      name: 'Test User 1',
      message: "Hey guys!",
      time: '5hrs ago',
      avatar: '/path/to/avatar.jpg',
      isOnline: false
    },
    {
      id: 3,
      name: 'Test User 2',
      message: "You: Another test message",
      time: '10m',
      avatar: '/path/to/avatar.jpg',
      isOnline: true
    },
    {
      id: 3,
      name: 'Test User 4',
      message: "HY ",
      time: 'yesterday',
      avatar: '/path/to/avatar.jpg',
      isOnline: true
    }
  ];

  return (
    <div className="mainpage-container">
     <Sidebar/>
      <ChatList 
        users={users}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      <MessageArea selectedUser={selectedUser} />
    </div>
  );
};

export default Chat;