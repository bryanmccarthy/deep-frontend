import { useState } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';

function Forms() {
  const [form, setForm] = useState('login');

  function handleFormChange() {
    form === 'login' ? setForm('register') : setForm('login');
  }

  return (
    <div className="forms">
      { form === 'login' ? <Login /> : <Register /> }
      { form === 'login' ? <button onClick={handleFormChange}>Don't have an account? Register</button> : <button onClick={handleFormChange}>Already have an account? Login</button> }
    </div>
  )
}

export default Forms;
