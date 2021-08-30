import { useState, useEffect } from 'react';
import { Form, Button, Container, Spinner, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Parser from 'html-react-parser';

const ProblemUser = ({ match }) => {

  const [details, setDetails] = useState({tests: []});
  const [answer, setAnswer] = useState('');
  const [sending, setLoading] = useState(false);
  const id = match.params.id;

  useEffect(() => {
    api.get(`/problems/${id}`).then((res) => {
      setDetails(res.data.data);
    }).catch(() => {
      toast.error('Falha ao obter problema');
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
        {details.description ? Parser(details.description) : null}
      </div>

      <Form className="tc" onSubmit={submit}>
        <p className="f4 pt4 pb2 tc b"> Testes públicos </p>

        {
          details.tests.map(
            (e, i) => 
            <Form.Group controlId={"answer"+i} as={Row} className="pt1" key={"answer"+i}>
              <Col>
                <Form.Control type="text" as="textarea" rows={3} value={e.input} disabled/>
              </Col>
              {
                e.output ? 
                  <Col>
                    <Form.Control type="text" as="textarea" rows={3} disabled value={e.output}/>
                  </Col> 
                : null
              }
            </Form.Group>
          )
        } 

        <p className="f4 pt4 pb2 tc b"> Sua resposta </p>
        <Form.Group controlId={"answer"} className="pb3">
          <Form.Control type="text" as="textarea" rows={10} value={answer} onChange={e => setAnswer(e.target.value)}/>
          {/* <ReactQuill value={answer} onChange={setAnswer} formats={quillFormats} modules={quillModules}/> */}
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
          Executar com Python tuthor
        </Button>
      </Form>
    </Container>
  );
};

export default ProblemUser;