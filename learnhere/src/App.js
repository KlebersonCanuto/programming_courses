import Routes from './Routes';
import { AuthProvider } from './contexts/auth';

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
