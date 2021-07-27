import { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../services/api";

const ModuleForm = ({ openForm, closeModal, courseId, id }) => {

  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(id) {
      api.get(`/modules/${id}`).then(res => {
        setName(res.data.data.name);
        setNumber(res.data.data.number);
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
    <Modal show={openForm} onHide={() => closeModal()}>
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <span className="f4 b"> {id? "Editar" : "Adicionar"} módulo</span>
        </Modal.Header>

        <Col md={{ span: 6, offset: 3 }}>
          <Form.Group controlId="name" className="pb3">
            <p className="tc b">Nome do módulo</p>
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
    </Modal>
  );
};

export default ModuleForm;