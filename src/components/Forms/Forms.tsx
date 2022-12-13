import './Forms.scss';
import { useState } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';

function Forms() {
  const [form, setForm] = useState('login');

  function handleFormChange() {
    form === 'login' ? setForm('register') : setForm('login');
  }

  return (
    <div className="Forms">
      { form === 'login' ? <Login /> : <Register /> }
      { form === 'login' ? <button className="FormButton" onClick={handleFormChange}>Don't have an account? Register</button> : <button className="FormButton" onClick={handleFormChange}>Already have an account? Login</button> }
    </div>
  )
}

export default Forms;
