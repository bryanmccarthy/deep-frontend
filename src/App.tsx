import './App.scss';
import Register from './components/Register/Register';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Register />
      </div>
    </QueryClientProvider>
  )
}

export default App;
