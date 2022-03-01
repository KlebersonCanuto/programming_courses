import { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import api from '../../services/api';
import { quillFormats, quillModules } from '../../services/util';

const QuizForm = ({ closeModal, moduleId, id }) => {

  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [hint, setHint] = useState('');
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(id) {
      api.get(`/quizzes/details/${id}`).then((res) => {
        setTitle(res.data.data.title);
        setQuestion(res.data.data.question);
        setAnswers(res.data.data.answers);
        setHint(res.data.data.hint);
      }).catch(() => {
        toast.error('Falha ao carregar questão');
        closeModal();
      });
    }
  }, [id, closeModal])

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ModuleId: moduleId,
      hint,
      title,
      question,
      answers,
      number: 0
    };

    let request, op;
    if (id) {
      request = api.put(`/quizzes/${id}`, data);
      op = 'editada';
    } else {
      request = api.post('/quizzes', data);
      op = 'criada';
    }

    request.finally(() => {
      setLoading(false);
    }).then(() => {
      toast.success(`Questão ${op} com sucesso`);
      closeModal();
    }).catch(() => {
      toast.error('Falha ao salvar questão');
    });
  }

  const changeAnswer = (index, event) => {
    let values = [...answers];
    values[index] = event.target.value;
    setAnswers(values);
  }

  const removeAnswer = (index) => {
    let values = [...answers];
    values.splice(index,1);
    setAnswers(values);
 }

  return (
    <Modal size="lg" show={true} onHide={() => closeModal()}>
      <Container>
        <Form onSubmit={submit}>
          <Modal.Header closeButton>
            <span className="f4 b"> {id? "Editar" : "Adicionar"} questão</span>
          </Modal.Header>

          <Form.Group controlId="title" className="pt3">
            <p className="tc b">Título</p>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="question" className="pt3">
            <p className="tc b">Pergunta</p>
            <ReactQuill value={question} onChange={setQuestion} formats={quillFormats} modules={quillModules}/>
          </Form.Group>

          <Form.Group controlId="hint" className="pt3">
            <p className="tc b">Dica</p>
            <Form.Control type="text" value={hint} onChange={(e) => setHint(e.target.value)}/>
          </Form.Group>

          <p className="tc pt3 b">Respostas aceitas</p>
          {
            answers.map(
              (e, i) => 
              <Form.Group controlId={"answer"+i} as={Row} className="pt1" key={"answer"+i}>
                <Col>
                  <Form.Control type="text" value={e} onChange={(e) => changeAnswer(i, e)}/>
                </Col>
                <Col className="tl" md={3}>
                  <Button variant="danger" onClick={() => removeAnswer(i)}>
                    Remover
                  </Button>
                </Col>
              </Form.Group>
            )
          } 
          <div className="pt2 pb2">
            <Button  onClick={() => setAnswers([...answers, ''])}>
              Adicionar resposta
            </Button>
          </div>

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