import './Login.scss';
import { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type LoginProps = {
  setUser: (user: string | null) => void;
}

function Login({ setUser }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidAuthSnackbarOpen, setInvalidAuthSnackbarOpen] = useState<boolean>(false);

  function validateEmail(email: string) {
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  }

  async function loginUser() {
    if (!validateEmail(email)) {
      setInvalidAuthSnackbarOpen(true);
      return;
    }
    if (password === '') {
      setInvalidAuthSnackbarOpen(true);
      return;
    }

    const res = await axios.post(import.meta.env.VITE_URL + '/auth/login', {
      Email: email,
      Password: password,
    }, 
    {
      withCredentials: true,
    });
   
    if (res.status === 200) {
      sessionStorage.setItem('userFirstName', res.data.firstname);
      sessionStorage.setItem('userLastName', res.data.lastname);
      setUser(res.data.firstname)
    } 
  }

  function handleSnackbarClose() {
    setInvalidAuthSnackbarOpen(false);
  };

  return (
    <div className="Login">
      <form className="LoginForm">
        <input className="LoginInput" placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="LoginInput" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="LoginButton" type="button" onClick={loginUser}>Login</button>
      </form>
     <Snackbar
        open={invalidAuthSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="Invalid Email or Password"
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

export default Login;
