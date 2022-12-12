import './App.scss';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Register />
        <Login />
      </div>
    </QueryClientProvider>
  )
}

export default App;
