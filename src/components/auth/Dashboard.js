import React from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from '../chat/Chat';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="dashboard">
      <Chat />
    </div>
  );
};

export default Dashboard;