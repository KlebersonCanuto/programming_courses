import { useState, useEffect } from 'react';
import { Button, Form, Container, Alert, Spinner, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';

const User = () => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(0);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    api.get('/users').then(res => {
      setEmail(res.data.user.email);
      setUsername(res.data.user.username);
      setEmailConfirmed(res.data.user.emailConfirmed);
      setPoints(res.data.points);
    })
  }, []);

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    setInvalid(false);

    const data = {
      username
    };

    api.put('/users', data).finally(() => {
      setLoading(false);
    }).then(() => {
      toast.success(`Usuário editado com sucesso`);
    }).catch(() => {
      setInvalid(true);
    });
  }

  return (
    <Container>
      <Form onSubmit={submit} >
        <p className="tc f3 b"> Área do usuário </p>
        <p className="tc f4 b"> Email </p>
        <p className="tc f4"> {email} {' '}
          { emailConfirmed ?     
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle green" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg> : null
          } 
        </p>
        <p className="tc f4 b"> Pontuação </p>
        <p className="tc"> {points} pontos </p>
        <p className="tc f4 b"> Nome de usuário </p>
        <Col md={{ span: 4, offset: 4 }}>
          <Form.Group controlId="username" className="pb3">
            <Form.Control type="text" className="tc" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </Form.Group>
        </Col>
        <div className="tc pb3">
          {
            loading ? (
              <Button variant="success" disabled>
                <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"/> Salvando...
              </Button>
            ) :
              <Button variant="success" type="submit">
                Salvar
              </Button>
          }
        </div>
        {
          invalid ? (
            <Col md={{ span: 6, offset: 3 }}>
              <Alert className="tc" variant="danger">
                Falha ao salvar dados
              </Alert>
            </Col>
          ) : null
        }
      </Form>
    </Container>
  );
};

export default User;