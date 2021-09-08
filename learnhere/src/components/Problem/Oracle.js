import { useState } from 'react';
import { Modal, Container, Form, Button, Spinner, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';

const ProblemForm = ({ closeModal, id }) => {

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [inputOnly, setInputOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      input,
      output,
      inputOnly
    };
    api.post(`/problems/oracle/${id}`, data).finally(() => {
      setLoading(false);
    }).then((res) => {
      if (inputOnly) {
        setOutput(res.data.output)
        toast.info('Saída atualizada');
      } else {
        if (res.data.correct) {
          toast.success('Resposta correta');
        } else {
          toast.error('Resposta incorreta');
        }
      }
    }).catch(() => {
      toast.error('Falha ao obter resposta');
    });
  }

  return (
    <Modal size="lg" show={true} onHide={() => closeModal()}>
      <Container>
        <Form onSubmit={submit}>
          <Modal.Header closeButton>
            <span className="f4 b"> Oráculo </span>
          </Modal.Header>

          <Form.Group controlId={"io"} as={Row} className="pt1 pb2">
            <Col>
              <p className="tc b"> Entrada </p>
              <Form.Control type="text" as="textarea" rows={3} onChange={(e) => setInput(e.target.value)} value={input}/>
            </Col>
            <Col>
              <p className="tc b"> Saída </p>
              <Form.Control type="text" as="textarea" rows={3} onChange={(e) => setOutput(e.target.value)} disabled={inputOnly} value={output}/>
            </Col> 
          </Form.Group>

          <Form.Group controlId="inputOnly" className="pt3 pb3">
            <Form.Check 
              type="switch"
              checked={inputOnly}
              onChange={() => setInputOnly(!inputOnly)}
              label="Apenas entrada"
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="danger" onClick={() => closeModal()}>
              Fechar
            </Button>
            {
              loading ? (
                <Button variant="success" disabled>
                  <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"/> Testando...
                </Button>
              ) :
                <Button variant="success" type="submit">
                  Testar
                </Button>
            }
          </Modal.Footer>
        </Form> 
      </Container>
    </Modal>
  );
};

export default ProblemForm;