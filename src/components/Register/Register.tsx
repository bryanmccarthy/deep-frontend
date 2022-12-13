import './Register.scss';
import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser() {
    await axios.post('http://localhost:3000/users/register', {
      Firstname: firstname,
      Lastname: lastname,
      Email: email,
      Password: password
    })
  }

  return (
    <div className="Register">
      <h1>Register</h1>
      <form className="RegisterForm">
        <label htmlFor="firstname">Firstname</label>
        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />

        <label htmlFor="lastname">Lastname</label>
        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />

        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={registerUser}>Register</button>
      </form>
    </div>
  )
}

export default Register;
