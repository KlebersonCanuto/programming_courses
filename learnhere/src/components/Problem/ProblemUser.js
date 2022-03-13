import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Spinner, Row, Col } from 'react-bootstrap';
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { toast } from 'react-toastify';
import api from '../../services/api';
import Oracle from './Oracle';
import Parser from 'html-react-parser';
import AceEditor from "react-ace";
import './text.css';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-solarized_dark";

const ProblemUser = ({ match }) => {

  const [details, setDetails] = useState({tests: []});
  const [answer, setAnswer] = useState('');
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const id = match.params.id;

  const getDetails = async () => {
    api.get(`/problems/${id}`).then((res) => {
      setDetails(res.data.data);
    }).catch(() => {
      toast.error('Falha ao obter problema');
    })
  };

  useEffect(() => {
    api.get(`/problems/${id}`).then((res) => {
      setDetails(res.data.data);
    }).catch(() => {
      toast.error('Falha ao obter problema');
    })
  }, [id])

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    const data = {
      id,
      answer
    };
    api.post(`/problems/${id}`, data).finally(() => {
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
      toast.error('Falha ao enviar resposta');
      getDetails();
    })
  }

  return (
    <Container>
      <p className="f4 pb2 tc"> <span className="b"> Problema: </span> {details.title} { 
        details.done ?  <BsFillPatchCheckFill className="green" title="Concluído"/> 
        : details.attempts ? <span className="green f7"> +{Math.max(10-details.attempts, 5)} pontos </span> 
        : <span className="green f7"> +10 pontos </span>
      } </p>
      
      <div>
        {details.description ? Parser(details.description) : null}
      </div>

      <div className="tc">
        { details.image_link ? 
          <img height="480" alt="Imagem" src={details.image_link}/> 
          : null
        }
      </div>

      <Form className="tc pb2" onSubmit={submit}>
        <p className="f4 pt4 pb2 tc b"> 
          Testes públicos <Button onClick={()=> setOpen(true)} variant="dark">
            Testar com oráculo
          </Button>
        </p>
        {
          details.tests.map(
            (e, i) => 
            <Form.Group controlId={"answer"+i} as={Row} className="pt1" key={"answer"+i}>
              <Col>
                <Form.Control type="text" as="textarea" rows={3} value={e.input} disabled/>
              </Col>
              <Col>
                <Form.Control type="text" as="textarea" rows={3} disabled value={e.output}/>
              </Col> 
            </Form.Group>
          )
        } 

        <p className="f4 pt4 pb2 tc b"> Sua resposta </p>
        <Form.Group controlId={"answer"} className="pb3">
          <AceEditor
            mode="python"
            theme="solarized_dark"
            placeholder="Digite o código aqui"
            onChange={v => setAnswer(v)}
            name="answer"
            width="auto"
            value={answer}  
            fontSize={14}
          />
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
        {' '}
        <Button onClick={()=> window.open(`https://pythontutor.com/visualize.html#mode=display&code=${encodeURIComponent(answer)}`, "_blank")} variant="dark">
          Executar com Python Tutor
        </Button>
      </Form>      
      { open ?
        <Oracle closeModal={() => setOpen(false)} attempts={details.attempts} id={id}/> : null
      }
    </Container>
  );
};

export default ProblemUser;