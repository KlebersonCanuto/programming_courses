import { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Col, ListGroup, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../services/api";

const ModuleForm = ({ openForm, closeModal, courseId, id }) => {

  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [problems, setProblems] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(id) {
      api.get(`/modules/${id}`).then(res => {
        setName(res.data.data.name);
        setNumber(res.data.data.number);
        setMaterials(res.data.data.materials);
        setQuizzes(res.data.data.quizzes);
        setProblems([]);
      }).catch(() => {
        toast.error("Falha ao carregar modulo");
        closeModal();
      });
    }
  }, [id, closeModal]);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setNumber(0);

    const data = {
      name,
      number,
      CourseId: courseId
    };

    let request, op;
    if (id) {
      request = api.put(`/modules/${id}`, data);
      op = "editado";
    } else {
      request = api.post("/modules", data);
      op = "criado";
    }

    request.finally(() => {
      setLoading(false);
    }).then(() => {
      toast.success(`Módulo ${op} com sucesso`);
      closeModal();
    }).catch(() => {
      toast.error("Falha ao salvar módulo");
    });
  }

  return (
    <Modal size="lg" show={openForm} onHide={() => closeModal()}>
      <Container>
        <Form onSubmit={submit}>
          <Modal.Header closeButton>
            <span className="f4 b"> {id? "Editar" : "Adicionar"} módulo</span>
          </Modal.Header>

          <Col md={{ span: 6, offset: 3 }} className="pt3">
            <Form.Group controlId="name" className="pb3">
              <p className="tc b">Nome do módulo</p>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
          </Col>

          <div className="pt3">
            <Button  onClick={() => {}}> Adicionar quiz </Button>
          </div>
          <ListGroup className="pt1">
            <ListGroup.Item variant="dark">Materiais</ListGroup.Item>
            { 
              materials.map(e =>
                <></>
              )
            }
            {
              !materials.length ? 
                <ListGroup.Item>Não há materiais cadastrados neste curso</ListGroup.Item>
              : null
            }
          </ListGroup>

          <div className="pt3">
            <Button  onClick={() => {}}> Adicionar material </Button>
          </div>
          <ListGroup className="pt1">
            <ListGroup.Item variant="dark">Quizzes</ListGroup.Item>
            { 
              quizzes.map(e =>
                <></>
              )
            }
            {
              !materials.length ? 
                <ListGroup.Item>Não há quizzes cadastrados neste curso</ListGroup.Item>
              : null
            }
          </ListGroup>

          <div className="pt3">
            <Button  onClick={() => {}}> Adicionar problema </Button>
          </div>
          <ListGroup className="pt1">
            <ListGroup.Item variant="dark">Problemas</ListGroup.Item>
            { 
              problems.map(e =>
                <></>
              )
            }
            {
              !materials.length ? 
                <ListGroup.Item>Não há problemas cadastrados neste curso</ListGroup.Item>
              : null
            }
          </ListGroup>
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

export default ModuleForm;