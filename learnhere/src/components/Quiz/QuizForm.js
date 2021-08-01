import { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import api from "../../services/api";
import { quillFormats, quillModules } from "../../services/util";

const QuizForm = ({ closeModal, moduleId, id }) => {

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(id) {
      api.get(`/quizzes/${id}`).then((res) => {
        setTitle(res.data.data.title);
        setQuestion(res.data.data.question);
      }).catch(() => {
        toast.error("Falha ao carregar quiz");
        closeModal();
      });
    }
  }, [id, closeModal])

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ModuleId: moduleId,
      hint: "",
      title,
      question,
      number: 0
    };

    let request, op;
    if (id) {
      request = api.put(`/quizzes/${id}`, data);
      op = "editado";
    } else {
      request = api.post("/quizzes", data);
      op = "criado";
    }

    request.finally(() => {
      setLoading(false);
    }).then(() => {
      toast.success(`Quiz ${op} com sucesso`);
      closeModal();
    }).catch(() => {
      toast.error("Falha ao salvar quiz");
    });
  }

  return (
    <Modal size="md" show={true} onHide={() => closeModal()}>
      <Container>
        <Form onSubmit={submit}>
          <Modal.Header closeButton>
            <span className="f4 b"> {id? "Editar" : "Adicionar"} quiz</span>
          </Modal.Header>

          <Form.Group controlId="title" className="pt3">
            <p className="tc b">Título</p>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="question" className="pt3 pb3">
            <p className="tc b">Descrição</p>
            <ReactQuill value={question} onChange={setQuestion} formats={quillFormats} modules={quillModules}/>
          </Form.Group>

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

export default QuizForm;