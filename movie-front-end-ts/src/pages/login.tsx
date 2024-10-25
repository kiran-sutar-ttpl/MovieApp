import React, { useEffect, useState } from 'react';
import Button from '../components/button/button';
import Input from '../components/input/input';
import '../styles/components/login.scss';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  // console.log('isAuthenticated---->', isAuthenticated);
  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: String) => {
    return password.length >= 6; 
  };

  const handleLogin = () => {
    let valid = true;
    let errorMessages = { email: '', password: '' };

    if (!validateEmail(email)) {
      errorMessages.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (!validatePassword(password)) {
      errorMessages.password = 'Password must be at least 6 characters long.';
      valid = false;
    }

    if (valid) {
      dispatch(login(email));
      navigate('/movies');
      setErrors({ email: '', password: '' }); 
    } else {
      setErrors(errorMessages);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Sign In</h1>

        <div className="login-form">
          <Input
            type="email"
            id="email"
            value={email}
            className={'input_email'}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>} {/* Email error message */}

          <Input
            type="password"
            id="password"
            value={password}
            className={'input_password'}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {errors.password && <span className="error-message">{errors.password}</span>} {/* Password error message */}

          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <Button onClick={handleLogin} label={'Login'} className={'primary'} />
        </div>
      </div>
    </div>
  );
};

export default Login;
