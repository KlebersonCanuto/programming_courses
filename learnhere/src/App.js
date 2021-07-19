import Routes from './Routes';
import Top from './Top';
import { AuthProvider } from './contexts/auth';
import { BrowserRouter } from 'react-router-dom';

const App = () => {

  return (
    <div className="app">
      <AuthProvider>
        <BrowserRouter>
          <Top/>
          <Routes/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
