import { useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { Button, Form, Container, Alert, Spinner, Col } from 'react-bootstrap';

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setInvalid(false);
    setLoading(true);

    const data = {
      email,
      password
    };

    login(data).finally(() => {
      setLoading(false);
    }).catch(res => {
      setInvalid(true);
    });
  }

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <p className="tc f3 b"> Seja bem-vindo! </p>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Group controlId="username">
            <p className="tc b">Email</p>
            <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
        </Col>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Group controlId="password">
            <p className="tc b">Senha</p>
            <Form.Control type="password" maxLength="12" value={password} onChange={(e) => setPassword(e.target.value)}/><p/>
          </Form.Group>
        </Col>
          <p className="tc">
            {
              loading ? (
                <Button variant="info" disabled>
                  <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"/> Conectando...
                </Button>
              ) :
                <Button variant="info" type="submit">
                  Entrar
                </Button>
            }
          </p>
          {
            invalid ? (
              <Col md={{ span: 6, offset: 3 }}>
                <Alert className="tc" variant="danger">
                  Usuário ou senha inválidos
                </Alert>
              </Col>
            ) : null
          }
      </Form>
    </Container>
  );
};

export default Login;