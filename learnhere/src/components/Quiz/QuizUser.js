import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Parser from 'html-react-parser';

const QuizUser = ({ match }) => {

  const [details, setDetails] = useState({});
  const [answer, setAnswer] = useState('');
  const [sending, setSending] = useState(false);
  const history = useHistory();
  const id = match.params.id;

  useEffect(() => {
    api.get(`/quizzes/${id}`).then((res) => {
      setDetails(res.data.data);
    }).catch(() => {
      toast.error('Falha ao obter questão');
    })
  }, [id])

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    const data = {
      id,
      answer
    };
    api.post(`/quizzes/${id}`, data).finally(() => {
      setSending(false);
    }).then((res) => {
      if(res.data.correct) {
        toast.success('Resposta correta');
        history.push(`/module/${details.ModuleId}`);
      } else {
        toast.error('Resposta errada');
      }
    }).catch(() => {
      toast.error('Falha ao enviar resposta');
    })
  }

  return (
    <Container>
      <p className="f4 pb2 tc"> <span className="b"> Questão: </span> {details.title} </p>
      <div>
        {details.question ? Parser(details.question) : null}
      </div>
      <p className="f4 pb2 tc b"> Sua resposta </p>
      <Form className="tc pb2" onSubmit={submit}>
        <Form.Group controlId={"answer"} className="pb3">
          <Form.Control type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
        </Form.Group>
        {
          sending ? (
            <Button variant="success" disabled>
              <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"/> Enviando...
            </Button>
          ) :
            <Button variant="success" type="submit">
              Enviar
            </Button>
        }
      </Form>
    </Container>
  );
};

export default QuizUser;