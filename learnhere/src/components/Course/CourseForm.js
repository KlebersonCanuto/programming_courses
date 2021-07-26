import { useState, useEffect } from 'react';
import { Button, Form, Alert, Spinner, Col, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import api from '../../services/api';

const CourseForm = ({ id }) => {

  const history = useHistory();

  const [name, setName] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(id) {
      api.get(`/courses/${id}`).then(res => {
        setName(res.data.data.name);
      }).catch(() => {
        toast.error("Falha ao carregar curso");
        history.push("/admin");
      });
    }
  }, [id, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvalid(false);
    setLoading(true);

    const data = {
      name
    };

    let request, op;
    
    if (id) {
      request = api.put(`/courses/${id}`, data);
      op = "editado";
    } else {
      request = api.post("/courses", data);
      op = "criado";
    }

    request.finally(() => {
      setLoading(false);
    }).then(() => {
      toast.success(`Curso ${op} com sucesso`);
      history.push("/admin");
    }).catch(() => {
      setInvalid(true);
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Col md={{ span: 6, offset: 3 }}>
        <Form.Group controlId="name" className="pb3">
          <p className="tc b">Nome do curso</p>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </Form.Group>
      </Col>
        <Row className="tc pb3">
          <Col className="tr">
            <Link to={`/admin`}>
              <Button variant="dark" type="submit">
                Voltar
              </Button>
            </Link>
          </Col>
          <Col className="tl">
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
          </Col>
        </Row>
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