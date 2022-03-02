import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { toast } from 'react-toastify';
import api from '../../services/api';
import Parser from 'html-react-parser';

const QuizUser = ({ match }) => {

  const [details, setDetails] = useState({});
  const [answer, setAnswer] = useState('');
  const [hint, setHint] = useState('');
  const [sending, setSending] = useState(false);
  const history = useHistory();
  const id = match.params.id;

  const getDetails = async () => {
    api.get(`/quizzes/${id}`).then((res) => {
      setDetails(res.data.data);
    }).catch(() => {
      toast.error('Falha ao obter questão');
    })
  };

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
        getDetails();
      }
    }).catch(() => {
      getDetails();
      toast.error('Falha ao enviar resposta');
    })
  }

  const askForHint = () => {
    api.get(`/quizzes/hint/${id}`).then((res) => {
      setHint(res.data.data);
    }).catch(() => {
      toast.error('Falha ao obter dica');
    })
  }

  return (
    <Container>
      <p className="f4 pb2 tc"> <span className="b"> Questão: </span> {details.title} { 
        details.done ?  <BsFillPatchCheckFill className="green" title="Concluído"/> 
        : details.attempts ? <span className="green f7"> +{Math.max(5-details.attempts, 3)} pontos </span> 
        : <span className="green f7"> +5 pontos </span> } </p> 
      <div>
        {details.question ? Parser(details.question) : null}
      </div>
      {
        hint ? <p>{hint}</p> : null
      }
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
        } {}
        <Button onClick={()=> askForHint()} variant="dark">
          Pedir dica
        </Button>
      </Form>
    </Container>
  );
};

export default QuizUser;