import { AppRouter } from './router/AppRouter';
import { Toaster } from 'react-hot-toast';
import './App.css';
import './index.css';

function App() {
  return (
    <>
    <Toaster position="bottom-right" reverseOrder={false} />
    <AppRouter />
    </>
  );
}

export default App;