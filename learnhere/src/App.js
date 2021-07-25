import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routes from './Routes';
import Top from './Top';
import { AuthProvider } from './contexts/auth';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <div className="app">
      <AuthProvider>
        <BrowserRouter>
          <Top/>
          <ToastContainer/>
          <Routes/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
