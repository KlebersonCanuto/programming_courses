import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import HomeUser from './components/Home/HomeUser';
import HomeAdmin from './components/Home/HomeAdmin';
import Login from './components/Login';
import User from './components/User';
import Register from './components/Register';
import CourseUser from './components/Course/CourseUser';
import ModuleUser from './components/Module/ModuleUser';
import QuizUser from './components/Quiz/QuizUser';
import MaterialUser from './components/Material/MaterialUser';
import ProblemUser from './components/Problem/ProblemUser';
import FreeEditor from './components/Problem/FreeEditor';
import Ranking from './components/Ranking';
import { useAuth } from './contexts/auth';

const Routes = () => {

  const { auth, admin } = useAuth();

  return (
    <Switch>

      <Route exact path="/editor" component={FreeEditor} />
      <Route exact path="/rank" component={Ranking}/>
      {admin === "true" ? <Route exact path="/admin" component={HomeAdmin} /> : null}

      {auth ? <>
        <Route exact path="/course/:id" component={CourseUser}/>
        <Route exact path="/module/:id" component={ModuleUser}/>
        <Route exact path="/quiz/:id" component={QuizUser}/>
        <Route exact path="/material/:id" component={MaterialUser}/>
        <Route exact path="/problem/:id" component={ProblemUser}/>
        <Route exact path="/user" component={User} />
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
