import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import Forms from './components/Forms/Forms';
import Main from './components/Main';

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(sessionStorage.getItem('userFirstName'));
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        { user ? <Main /> : <Forms setUser={setUser} /> }
      </div>
    </QueryClientProvider>
  )
}

export default App;
