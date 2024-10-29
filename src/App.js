import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Register from './Register';
import './App.css';
import { io } from "socket.io-client";
import Mainpage from './Components/Mainpage';
import Profile from './Components/Profile';


function App() {


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mainpage" element={<Mainpage />} />
        <Route path='profile' element={<Profile />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
