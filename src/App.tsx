import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">

      </div>
    </QueryClientProvider>
  )
}

export default App
