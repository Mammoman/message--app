import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCamera, FaComments, FaUser, FaSearch } from 'react-icons/fa';
import Stories from './Stories';  
import UserMessages from './UserMessages';
import { io } from 'socket.io-client';
import '../Styles/Mainpage.css';
//import Camera from './Components/Camera';


const Mainpage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const socket = io('http://localhost:3000');
    const users = [
      { id: 1, name: 'Phillip Franci', pinned: true },
      { id: 2, name: 'Alfredo Saris', pinned: true },
      { id: 3, name: 'Jaylon Franci' },
      { id: 4, name: 'Tatiana Dorwart' },
      { id: 5, name: 'Terry Bergson' },
    ];
  



    return (
      <div>
        
            {isAuthenticated && (
          <div className="content-container">
            {selectedUser ? (
              <UserMessages user={selectedUser} />
            ) : (
              <>
                <header className="header">
                  <h2>You Received 48 Messages</h2>
                  <span className="options-icon">⋮</span>
                </header>
                <Stories users={users} />
                <div className="search-bar">
                  <FaSearch className="search-icon" />
                  <input type="text" placeholder="Search..." />
                </div>
                <div className="message-categories">
                  <button className="active">Direct Message</button>
                  <button>Group</button>
                </div>
                <div className="message-list">
                  <h3>Pinned Messages</h3>
                  {users.filter(user => user.pinned).map(user => (
                    <div
                      className="message-card"
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="avatar-placeholder"></div>
                      <div className="message-content">
                        <h3>{user.name}</h3>
                        <p>Last message preview...</p>
                      </div>
                    </div>
                  ))}
                  <h3>All Messages</h3>
                  {users.map(user => (
                    <div
                      className="message-card"
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="avatar-placeholder"></div>
                      <div className="message-content">
                        <h3>{user.name}</h3>
                        <p>Last message preview...</p>
                      </div>
                    </div>
                  ))}
                </div>
                <nav className="nav-bar">
                  <Link to="/camera">
                    <FaCamera className="nav-icon" />
                  </Link>
                  <FaComments className="nav-icon active" />
                  <FaUser className="nav-icon" />
                </nav>
              </>
            )}
          </div>
           )}
      </div>
    );
}


export default Mainpage;
