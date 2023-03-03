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
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);

  async function loginUser() {
    if (email === '') return; // TODO: add error handling
    if (password === '') return; // TODO: add error handling

    const res = await axios.post(import.meta.env.VITE_URL + '/auth/login', {
      Email: email,
      Password: password,
    }, 
    {
      withCredentials: true,
    })
    if (res.status === 200) {
      sessionStorage.setItem('userFirstName', res.data.firstname);
      sessionStorage.setItem('userLastName', res.data.lastname);
      setUser(res.data.firstname)
    } else {
      setErrorSnackbarOpen(true);
    }
  }

  function handleSnackbarClose() {
    setErrorSnackbarOpen(false);
  };

  return (
    <div className="Login">
      <form className="LoginForm">
        <input className="LoginInput" placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="LoginInput" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="LoginButton" type="button" onClick={loginUser}>Login</button>
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

export default Login;
