import { useState } from 'react';
import { Button, Form, Container, Alert, Spinner, Col } from 'react-bootstrap';
import api from '../../services/api';

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvalid(false);
    setLoading(true);

    const data = {
      username,
      email,
      password,
      confirmPassword
    };

    api.post('/users', data).finally(() => {
      setLoading(false);
    }).catch(res => {
      setInvalid(true);
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <p className="tc f3 b"> Cadastre-se! </p>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Group controlId="username">
            <p className="tc b">Nome de usuário</p>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </Form.Group>
        </Col>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Group controlId="email">
            <p className="tc b">Email</p>
            <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
        </Col>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Group controlId="password">
            <p className="tc b">Senha</p>
            <Form.Control type="password" maxLength="12" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
        </Col>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Group controlId="confirmPassword">
            <p className="tc b">Confirme sua senha</p>
            <Form.Control type="confirmPassword" maxLength="12" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </Form.Group>
        </Col>
          <p className="tc">
            {
              loading ? (
                <Button variant="info" disabled>
                  <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"/> Registrando...
                </Button>
              ) :
                <Button variant="info" type="submit">
                  Cadastrar
                </Button>
            }
          </p>
          {
            invalid ? (
              <Col md={{ span: 6, offset: 3 }}>
                <Alert className="tc" variant="danger">
                  Dados inválidos
                </Alert>
              </Col>
            ) : null
          }
      </Form>
    </Container>
  );
};

export default Register;