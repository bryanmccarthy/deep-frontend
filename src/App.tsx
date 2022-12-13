import './App.scss';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

const queryClient = new QueryClient();

function App() {
  
  const [form, setForm] = useState('login');

  function handleFormChange() {
    if (form === 'login') {
      setForm('register');
    } else {
      setForm('login');
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        { form === 'login' ? <Login /> : <Register /> }
        { form === 'login' ? <button onClick={handleFormChange}>Don't have an account?</button> : <button onClick={handleFormChange}>Already have an account?</button> }
      </div>
    </QueryClientProvider>
  )
}

export default App;
