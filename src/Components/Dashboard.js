import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/mainpage');
    };
  return (
    <div className='dashboard-container'>
      <h1 >Welcome Back</h1>
      <button onClick={handleContinue} className='continue-button'>Continue</button>
    </div>
  );
};

export default Dashboard;