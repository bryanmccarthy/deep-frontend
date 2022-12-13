import './Login.scss';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser() {
    const res = await axios.post('http://localhost:3000/users/login', {
      Email: email,
      Password: password,
    }, 
    {
      withCredentials: true,
    })
    sessionStorage.setItem('user', res.data);
    window.location.reload();
  }

  return (
    <div className="Login">
      <h1>Login</h1>
      <form className="LoginForm">
        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={loginUser}>Login</button>
      </form>
    </div>
  )
}

export default Login;
