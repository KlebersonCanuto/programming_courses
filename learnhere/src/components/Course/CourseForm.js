import { useState, useEffect } from 'react';
import { Button, Form, Spinner, Col, Modal, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';

const CourseForm = ({ id, closeModal }) => {

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(id) {
      api.get(`/courses/details/${id}`).then(res => {
        setName(res.data.data.name);
      }).catch(() => {
        toast.error('Falha ao carregar curso');
        closeModal();
      });
    }
  }, [id, closeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name
    };

    let request, op;
    
    if (id) {
      request = api.put(`/courses/${id}`, data);
      op = 'editado';
    } else {
      request = api.post('/courses', data);
      op = 'criado';
    }

    request.finally(() => {
      setLoading(false);
    }).then(() => {
      toast.success(`Curso ${op} com sucesso`);
      closeModal();
    }).catch(() => {
      toast.success(`Falha ao salvar curso`);
    });
  }

  return (
    <Modal size="md" show={true} onHide={() => closeModal()}>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <span className="f4 b"> {id? "Editar" : "Adicionar"} curso</span>
          </Modal.Header>
          <Col md={{ span: 6, offset: 3 }}>
            <Form.Group controlId="name" className="pb3">
              <p className="tc b">Nome do curso</p>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
          </Col>

          <Modal.Footer>
            <Button variant="danger" onClick={() => closeModal()}>
              Fechar
            </Button>
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
          </Modal.Footer>
        </Form>
      </Container>
    </Modal>
  );
};

export default CourseForm;