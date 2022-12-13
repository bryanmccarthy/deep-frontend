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
      <form className="RegisterForm">
        <div className="RegisterTitle">Register</div>

        <label htmlFor="firstname">Firstname</label>
        <input className="RegisterInput" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />

        <label htmlFor="lastname">Lastname</label>
        <input className="RegisterInput" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />

        <label htmlFor="email">Email</label>
        <input className="RegisterInput" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input className="RegisterInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="RegisterButton" type="button" onClick={registerUser}>Register</button>
      </form>
    </div>
  )
}

export default Register;
