import './Register.scss';
import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser() {
    await axios.post(import.meta.env.VITE_URL + '/auth/register', {
      Firstname: firstname,
      Lastname: lastname,
      Email: email,
      Password: password
    })
    // TODO: Clear form fields & display success message and switch to login page
  }

  return (
    <div className="Register">
      <form className="RegisterForm">
        <input className="RegisterInput" placeholder="firstname" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        <input className="RegisterInput" placeholder="lastname" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        <input className="RegisterInput" placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="RegisterInput" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="RegisterButton" type="button" onClick={registerUser}>Register</button>
      </form>
    </div>
  )
}

export default Register;
