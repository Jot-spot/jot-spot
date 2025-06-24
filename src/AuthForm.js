import React, { useState } from 'react';

function AuthForm ({setToken}){
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
}
function handleSubmit(e) {
    e.preventDefault();
    const route = isLogin ? '/login' : '/register';
    fetch(route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          setToken(data.access_token);
        } else if (data.message) {
          alert(data.message);
        } else {
          alert("Invalid credentials or username taken.");
        }
      });
  }