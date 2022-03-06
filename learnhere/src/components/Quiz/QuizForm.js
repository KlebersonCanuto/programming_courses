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
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [choice, setChoice] = useState(false);

  useEffect(() => {
    if(id) {
      api.get(`/quizzes/details/${id}`).then((res) => {
        setTitle(res.data.data.title);
        setQuestion(res.data.data.question);
        setAnswers(res.data.data.answers);
        setHint(res.data.data.hint);
        setOptions(res.data.data.options);
        setChoice(res.data.data.choice);
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
      choice,
      options,
      number: 0
    };

    console.log(data);

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

  const changeChoice = (value) => {
    setAnswers([]);
    setOptions([]);
    setChoice(value);
  }

  const getLetter = (i) => {
    return String.fromCharCode(i+65);
  }
  
  const getIndex = (letter) => {
    return letter.charCodeAt(0)-65;
  }

  const changeCorrect = (i) => {
    const letter = getLetter(i);
    if (answers.includes(letter)) {
      let values = [...answers];
      values.splice(i, 1);
      setAnswers(values);
    } else {
      setAnswers([...answers, letter])
    }
  }

  const changeOption = (index, event) => {
    let values = [...options];
    values[index] = event.target.value;
    setOptions(values);
  }

  const removeOption = (index) => {
    let values = [...options];
    values.splice(index,1);
    let valuesAnswer = [...answers];
    valuesAnswer = valuesAnswer.filter(e => getIndex(e) > index).map(e => getLetter(getIndex(e)-1));
    setOptions(values);
    setAnswers(valuesAnswer);
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

          <Form.Group controlId="choice" className="pt3">
            <Form.Check 
              type="switch"
              checked={choice}
              onChange={() => changeChoice(!choice)}
              label="Questão de escolha"
            />
          </Form.Group>

          {
            !choice ? 
            <>
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
            </> 
            : <>
              <p className="tc pt3 b">Opções</p>
              {
                options.map(
                  (e, i) => 
                  <Row className="pt1" key={"option"+i}>
                    <Col md={10} sm={12}>
                      <Form.Group controlId={"option"+i} as={Row} className="pt1">
                        <Form.Label column md="1" sm="2" xs="2">
                          {getLetter(i)} - 
                        </Form.Label>
                        <Col xs="10" sm="10" md="11">
                          <Form.Control  as="textarea" rows="2" label="TESTE" type="text" value={e} onChange={(e) => changeOption(i, e)}/>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col className="tl" md={2} sm={4}>
                      <Button variant="danger" onClick={() => removeOption(i)}>
                        Remover
                      </Button>
                      <div className="pt1">
                        <Form.Group controlId="correct" className="">
                          <Form.Check 
                            type="switch"
                            checked={answers.includes(getLetter(i))}
                            onChange={() => changeCorrect(i)}
                            label="Correta"
                          />
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                )
              } 
              <div className="pt2 pb2">
                <Button  onClick={() => setOptions([...options, ''])}>
                  Adicionar opção
                </Button>
              </div>
            </>
          }

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