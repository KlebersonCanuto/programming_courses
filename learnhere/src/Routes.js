import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import HomeUser from './components/Home/HomeUser';
import Login from './components/Login';
import { useAuth } from './contexts/auth';

const Routes = () => {

  const { auth, admin } = useAuth();

  return (
    <Switch>

      {auth ? <>
          <Route exact path="/" component={Home} />
      </> : <>
          <Route exact path="/" component={HomeUser} />
          <Route exact path="/login" component={Login} />
      </>}

      {admin ? <>
      </> : null}
    </Switch>
  );
};

export default Routes;
