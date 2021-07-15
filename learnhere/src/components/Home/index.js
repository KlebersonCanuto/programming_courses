
import { useAuth } from '../../contexts/auth';
import { Button } from 'react-bootstrap';

const Home = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Home;