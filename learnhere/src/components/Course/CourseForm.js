import { useState } from 'react';
import { Button, Form, Alert, Spinner, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../../services/api';

const CourseForm = () => {

  const history = useHistory();

  const [name, setName] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvalid(false);
    setLoading(true);

    const data = {
      name
    };

    api.post("/courses", data).finally(() => {
      setLoading(false);
    }).then(() => {
      history.push("/admin");
      toast.success("Curso criado com sucesso")
    }).catch(res => {
      setInvalid(true);
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <p className="tc f3 b"> Cadastre o curso </p>
      <Col md={{ span: 6, offset: 3 }}>
        <Form.Group controlId="name" className="pb3">
          <p className="tc b">Nome do curso</p>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
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
                Curso inválido
              </Alert>
            </Col>
          ) : null
        }
    </Form>
  );
};

export default CourseForm;