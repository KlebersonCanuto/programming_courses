import { useAuth } from '../../contexts/auth';
import { Button } from 'react-bootstrap';

const Login = () => {
  const { login } = useAuth();

  const handleLogin = async () => {
    await login({
      email: '1',
      password: '1',
    });
  }

  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;