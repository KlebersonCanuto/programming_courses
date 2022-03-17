import { useState } from 'react';
import { Form, Button, Container, Spinner, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-solarized_dark";

const FreeEditor = () => {

  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [sending, setSending] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    const data = {
      code,
      input
    };
    api.post(`/problems/code`, data).finally(() => {
      setSending(false);
    }).then((res) => {
        setOutput(res.data.output)
        toast.success('Executado com sucesso');
    }).catch(() => {
      toast.error('Falha ao executar o código');
    })
  }

  return (
    <Container>
      <p className="f4 pb2 tc"> <span className="b"> Editor </span> </p>

      <Form className="tc pb2" onSubmit={submit}>
        <Row>
          <Col>
            <Form.Group controlId={"code"} className="pb3">
              <p className="tc b">Descrição</p>
              <AceEditor
                mode="python"
                theme="solarized_dark"
                placeholder="Digite o código aqui"
                onChange={v => setCode(v)}
                name="code"
                width="auto"
                value={code}  
                fontSize={14}
              />
            </Form.Group>
          </Col>
          <Col>
            <Row>
              <Form.Group controlId={"input"} className="pb3">
                <p className="tc b">Entrada</p>
                <Form.Control type="text" as="textarea" rows={8} value={input} onChange={e => setInput(e.target.value)}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId={"input"} className="pb3">
                <p className="tc b">Saída</p>
                <Form.Control type="text" as="textarea" disabled rows={9} value={output}/>
              </Form.Group>
            </Row>
          </Col>
        </Row>

        {
          sending ? (
            <Button variant="success" disabled>
              <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"/> Enviando...
            </Button>
          ) :
            <Button variant="success" type="submit">
              Executar
            </Button>
        }
        {' '}
        <Button onClick={()=> window.open(`https://pythontutor.com/visualize.html#mode=display&code=${encodeURIComponent(code)}`, "_blank")} variant="dark">
          Executar com Python Tutor
        </Button>
      </Form>      
    </Container>
  );
};

export default FreeEditor;