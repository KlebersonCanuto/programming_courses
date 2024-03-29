import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Container, Alert, Spinner, Col } from 'react-bootstrap';
import api from '../../services/api';

const Register = () => {

  const history = useHistory();

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
      confirmPassword,
      profileImageURL: ''
    };

    api.post('/users', data).finally(() => {
      setLoading(false);
    }).then(() => {
      toast.success('Cadastrado com sucesso');
      history.push('/');
    }).catch(res => {
      setInvalid(true);
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <p className="tc f3 b"> Cadastre-se! </p>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Group controlId="username" className="pb3">
            <p className="tc b">Nome de usuário</p>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </Form.Group>
        </Col>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Group controlId="email" className="pb3">
            <p className="tc b">Email</p>
            <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
        </Col>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Group controlId="password" className="pb3">
            <p className="tc b">Senha</p>
            <Form.Control type="password" maxLength="12" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
        </Col>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Group controlId="confirmPassword" className="pb3">
            <p className="tc b">Confirme sua senha</p>
            <Form.Control type="password" maxLength="12" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </Form.Group>
        </Col>
          <div className="tc pb3">
            {
              loading ? (
                <Button variant="success" disabled>
                  <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"/> Cadastrando...
                </Button>
              ) :
                <Button variant="success" type="submit">
                  Cadastrar
                </Button>
            }
          </div>
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