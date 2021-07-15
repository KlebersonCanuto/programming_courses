import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useAuth } from './contexts/auth';
import Home from './components/Home';
import Login from './components/Login';

const Routes = () => {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      {auth ? (
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default Routes;
