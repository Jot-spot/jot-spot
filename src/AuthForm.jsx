import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const BASE_URL = 'http://localhost:5000';
function AuthForm({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const route = isLogin ? `${BASE_URL}/login` : `${BASE_URL}/register`;
    fetch(route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('username', data.username);
          setToken(data.access_token);
        } else if (data.message) {
          alert(data.message);
        } else {
          alert("Invalid credentials or username taken.");
        }
      });
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-title" >{isLogin ? 'Login' : 'Register'}</h2>
      <input   className="auth-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input className="auth-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button className="auth-button" type="submit" >{isLogin ? (<><FontAwesomeIcon icon={faRightToBracket} /> Login</>) : ('Register')}</button>
      <p className="auth-toggle" onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }}>
        {isLogin ? 'Need to register?' : 'Already have an account?'}
      </p>
    </form>
  );
}

export default AuthForm;
