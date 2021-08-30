import { useState, useEffect } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Parser from 'html-react-parser';

const QuizUser = ({ match }) => {

  const [details, setDetails] = useState({});
  const [answer, setAnswer] = useState('');
  const [sending, setLoading] = useState(false);
  const id = match.params.id;

  useEffect(() => {
    api.get(`/quizzes/${id}`).then((res) => {
      setDetails(res.data.data);
    }).catch(() => {
      toast.error('Falha ao obter questão');
    })
  }, [id])

  const submit = (e) => {
    setLoading(true);
    e.preventDefault();
  }

  return (
    <Container>
      <p className="f4 pb2 tc"> <span className="b"> Questão: </span> {details.title} </p>
      <div>
        {details.question ? Parser(details.question) : null}
      </div>
      <p className="f4 pb2 tc b"> Sua resposta </p>
      <Form className="tc" onSubmit={submit}>
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