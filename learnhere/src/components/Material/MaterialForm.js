import { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../services/api";

const MaterialForm = ({ openForm, closeModal, courseId, startId }) => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(startId) {
      api.get(`/materials/${startId}`).then(() => {
      }).catch(() => {
        toast.error("Falha ao carregar material");
        closeModal();
      });
    }
    
  }, [startId, closeModal])

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    closeModal();
  }


  return (
    <Modal size="md" show={openForm} onHide={() => closeModal()}>
      <Container>
        <Form onSubmit={submit}>
          <Modal.Header closeButton>
            <span className="f4 b"> {startId? "Editar" : "Adicionar"} material</span>
          </Modal.Header>

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

export default MaterialForm;