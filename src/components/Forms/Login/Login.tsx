import './Login.scss';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser() {
    const res = await axios.post(import.meta.env.VITE_URL + '/auth/login', {
      Email: email,
      Password: password,
    }, 
    {
      withCredentials: true,
    })
    if (res && res.status === 200) {
      sessionStorage.setItem('userFirstName', res.data.firstname);
      sessionStorage.setItem('userLastName', res.data.lastname);
      window.location.reload();
    }
  }

  return (
    <div className="Login">
      <form className="LoginForm">
        <div className="LoginTitle">Login</div>
        <input className="LoginInput" placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="LoginInput" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="LoginButton" type="button" onClick={loginUser}>Login</button>
      </form>
    </div>
  )
}

export default Login;
