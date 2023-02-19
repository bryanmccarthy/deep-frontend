import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import Forms from './components/Forms/Forms';
import Main from './components/Main';

const queryClient = new QueryClient();

function App() {
  const user = sessionStorage.getItem('userFirstName');
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        { user ? <Main /> : <Forms /> }
      </div>
    </QueryClientProvider>
  )
}

export default App;
