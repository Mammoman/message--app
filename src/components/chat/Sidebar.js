// src/components/chat/Sidebar.js
import React, { useState } from 'react';
import { FaHome, FaComments, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import '../../styles/chat/Sidebar.css';
import Settings from '../settings/Settings';

const Sidebar = () => {
    const navigate = useNavigate();
    const currentUser = auth.currentUser;
    const [showSettings, setShowSettings] = useState(false);

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <div className="user-avatar">
                    {currentUser?.photoURL ? (
                        <img src={currentUser.photoURL} alt="Profile" />
                    ) : (
                        <div className="avatar-placeholder">
                            {currentUser?.email?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
            </div>

            <div className="sidebar-menu">
                <button className="menu-item active">
                    <FaHome />
                </button>
                <button className="menu-item">
                    <FaComments />
                </button>
                <button className="menu-item">
                    <FaUsers />
                </button>
                <button className="menu-item" onClick={toggleSettings}>
                    <FaCog />
                </button>
            </div>

            <div className="sidebar-bottom">
                <button className="menu-item logout" onClick={handleSignOut}>
                    <FaSignOutAlt />
                </button>
            </div>

            {showSettings && (
                <div className="settings-overlay">
                    <Settings />
                    <button className="close-settings" onClick={toggleSettings}>Close</button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;