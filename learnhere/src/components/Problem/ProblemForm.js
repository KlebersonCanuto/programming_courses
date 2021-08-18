import { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import api from "../../services/api";
import { quillFormats, quillModules } from "../../services/util";

const ProblemForm = ({ closeModal, moduleId, id }) => {

  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    if(id) {
      api.get(`/problems/${id}`).then((res) => {
        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
        // setDescription(res.data.data.tests);
      }).catch(() => {
        toast.error("Falha ao carregar problema");
        closeModal();
      });
    }
  }, [id, closeModal])

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    let data = new FormData();
    data.append("ModuleId", moduleId);
    data.append("title", title);
    data.append("file", file);
    data.append("description", description);
    data.append("tests", tests);
    let request, op;
    if (id) {
      request = api.put(`/problems/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      op = "editado";
    } else {
      request = api.post("/problems", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      op = "criado";
    }

    request.finally(() => {
      setLoading(false);
    }).then(() => {
      toast.success(`Problema ${op} com sucesso`);
      closeModal();
    }).catch(() => {
      toast.error("Falha ao salvar problema");
    });
  }

  const changeTest = (index, event) => {
    let values = [...tests];
    values[index].input = event.target.value;
    setTests(values);
  }

  const removeTest = (index) => {
    let values = [...tests];
    values.splice(index,1);
    setTests(values);
 }

  return (
    <Modal size="lg" show={true} onHide={() => closeModal()}>
      <Container>
        <Form onSubmit={submit}>
          <Modal.Header closeButton>
            <span className="f4 b"> {id? "Editar" : "Adicionar"} problema</span>
          </Modal.Header>

          <Form.Group controlId="title" className="pt3">
            <p className="tc b">Título</p>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="description" className="pt3 pb3">
            <p className="tc b">Descrição</p>
            <ReactQuill value={description} onChange={setDescription} formats={quillFormats} modules={quillModules}/>
          </Form.Group>

          <Form.Group controlId="file" className="mb-3">
            <p className="tc b">Escolha o arquivo solução</p>
            <Form.Control type="file" onChange={(e) => {
              setFile(e.target.files[0]);
            }} accept=".py" size="sm" />
          </Form.Group>

          <p className="tc pt3 b">Respostas</p>
          {
            tests.map(
              (e, i) => 
              <Form.Group controlId={"answer"+i} as={Row} className="pt1" key={"answer"+i}>
                <Col>
                  <Form.Control type="text" as="textarea" rows={3} value={e.input} onChange={(e) => changeTest(i, e)}/>
                </Col>
                {
                  e.output ? 
                    <Col>
                      <Form.Control type="text" as="textarea" rows={3} disabled value={e.output}/>
                    </Col> 
                  : null
                }
                <Col className="tl" md={3}>
                  <Button variant="danger" onClick={() => removeTest(i)}>
                    Remover
                  </Button>
                </Col>
              </Form.Group>
            )
          } 
          <div className="pt2 pb2">
            <Button  onClick={() => setTests([...tests, {input: ''}])}>
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

export default ProblemForm;