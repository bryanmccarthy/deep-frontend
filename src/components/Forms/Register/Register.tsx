import './Register.scss';
import { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);

  async function registerUser() {
    if (firstname === '') return; // TODO: add error handling
    if (lastname === '') return; // TODO: add error handling
    if (email === '') return; // TODO: add error handling
    if (password === '') return; // TODO: add error handling

    const res = await axios.post(import.meta.env.VITE_URL + '/auth/register', {
      Firstname: firstname,
      Lastname: lastname,
      Email: email,
      Password: password
    })

    if (res.status !== 200) {
      setErrorSnackbarOpen(true);
    }
    // TODO: Clear form fields & display success message and switch to login page
  }

  function handleSnackbarClose() {
    setErrorSnackbarOpen(false);
  };

  return (
    <div className="Register">
      <form className="RegisterForm">
        <input className="RegisterInput" placeholder="firstname" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        <input className="RegisterInput" placeholder="lastname" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        <input className="RegisterInput" placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="RegisterInput" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="RegisterButton" type="button" onClick={registerUser}>Register</button>
      </form>

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="oops, something went wrong!"
        action={
          <div>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        }
      />
    </div>
  )
}

export default Register;
