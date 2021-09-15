import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from './contexts/auth';

const Top = () => {

  const { auth, admin, logout } = useAuth();

  const signOut = () => {
    logout();
  }

  return (
    <Navbar bg="dark" className="tc" variant="dark">
      <Container>
        <Nav className="navbar-nav mt-auto mr-auto ">
          <Nav.Link as={Link} to="/" className="f5 b white hover-light-gray">
            Inicio
          </Nav.Link>
        </Nav>

        <Nav>
          { admin ? 
            <Nav.Link as={Link} to="/admin" className="f5 white hover-light-gray">
              Área de administração
            </Nav.Link> : null
          }

          { auth ? 
            <>
              <Nav.Link as={Link} to="/user" className="f5 white hover-light-gray">
                Conta
              </Nav.Link> 
              <Nav.Link as={Link} onClick={signOut} to="/" className="f5 white hover-light-gray">
                Sair
              </Nav.Link> 
            </> : 
            <>
              <Nav.Link as={Link} to="/login" className="f5 white hover-light-gray">
                Entrar
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="f5 white hover-light-gray">
                Cadastrar
              </Nav.Link>
            </>
          }
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Top;