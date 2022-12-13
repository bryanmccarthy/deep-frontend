import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import Auth from './components/Forms/Forms';
import Secret from './components/Secret';

const queryClient = new QueryClient();

function App() {

  const user = false;
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        { user ? <Secret /> : <Auth /> }
      </div>
    </QueryClientProvider>
  )
}

export default App;
