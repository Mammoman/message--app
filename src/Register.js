import {auth} from './firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import React, {useState} from 'react'
import { FaGoogle, FaLinkedinIn,FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import './Styles/Login.css';

const Register = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('daniel@gmail.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const login = (e) => {
    e.preventDefault();
    setError('');
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log('User logged in:', res.user);
        localStorage.setItem('authToken', res.user.accessToken);
        navigate('/dashboard'); 
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <div className="social-container">
            <FaFacebook className="socials"/>
            <FaGoogle className="socials"/>
            <FaLinkedinIn className="socials"/>
          </div>
          <span className='text4'>or use your email for registration</span>
          <input type="text" placeholder="Name" className='text'/>
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Password"/>
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={login} name='login_form'>
          <h1>Sign in</h1>
          <div className="social-container">
          <FaFacebook className="socials"/>
            <FaGoogle className="socials"/>
            <FaLinkedinIn className="socials"/>
          </div>
          <span>or use your account</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
          {error && <p>{error}</p>}
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn" onClick={toggleSignUp}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp" onClick={toggleSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
