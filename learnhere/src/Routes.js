import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import HomeUser from './components/Home/HomeUser';
import HomeAdmin from './components/Home/HomeAdmin';
import Course from './components/Course';
import EditCourse from './components/Course/EditCourse';
import Login from './components/Login';
import Register from './components/Register';
import { useAuth } from './contexts/auth';

const Routes = () => {

  const { auth, admin } = useAuth();

  return (
    <Switch>

      {admin ? <Route exact path="/admin" component={HomeAdmin} /> : null}
      {admin ? <Route exact path="/new_course" component={Course} /> : null}
      {admin ? <Route exact path="/edit_course/:id" component={EditCourse} /> : null}

      {auth ? <>
        <Route exact path="/" component={HomeUser} />
      </> : <>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </>}


    </Switch>
  );
};

export default Routes;
