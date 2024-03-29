import './Register.scss';
import { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const accent = "#000000";
const errorRed = "#f28585";

type RegisterProps = {
  setForm: (form: string) => void;
}

function Register({ setForm }: RegisterProps) {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [invalidAuthSnackbarOpen, setInvalidAuthSnackbarOpen] = useState<boolean>(false);

  function validateEmail(email: string) {
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  }

  function validatePassword(password: string) {
    return password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
  }

  async function registerUser() {
    if (firstname === '') {
      setInvalidAuthSnackbarOpen(true);
      return;
    } 
    if (lastname === '') {
      setInvalidAuthSnackbarOpen(true);
      return;
    }  
    if (!isValidEmail) { 
      setInvalidAuthSnackbarOpen(true);
      return;
    } 
    if (!isValidPassword) {
      setInvalidAuthSnackbarOpen(true);
      return; 
    }

    const res = await axios.post(import.meta.env.VITE_URL + '/auth/register', {
      Firstname: firstname,
      Lastname: lastname,
      Email: email,
      Password: password
    })

    if (res.status === 200) {
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
      setForm('login');
    }
  }

  function handleSnackbarClose() {
    setInvalidAuthSnackbarOpen(false);
  };

  function handleEmailChange(email: string) {
    if (validateEmail(email) || email === '') {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
    setEmail(email);
  }

  function handlePasswordChange(password: string) {
    if (validatePassword(password) || password === '') {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
    setPassword(password);
  }

  return (
    <div className="Register">
      <form className="RegisterForm">
        <input className="RegisterInput" placeholder="firstname" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        <input className="RegisterInput" placeholder="lastname" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        <input style={{ color: isValidEmail ? accent : errorRed }} className="RegisterInput" placeholder="email" type="email" value={email} onChange={(e) => handleEmailChange(e.target.value)} />
        <input style={{ color: isValidPassword ? accent : errorRed }} className="RegisterInput PasswordInput" placeholder="password" type="password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} />
        <p className="PasswordError" style={{ visibility: isValidPassword ? "hidden" : "visible" }}>password must contain at least 8 characters</p>
        <button className="RegisterButton" type="button" onClick={registerUser}>Register</button>
      </form>

      <Snackbar
        open={invalidAuthSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="invalid form fields"
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
