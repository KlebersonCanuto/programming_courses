import { useState, useEffect, useCallback } from "react";
import { Modal, Button, Form, Spinner, Col, ListGroup, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import QuizForm from "../Quiz/QuizForm";
import MaterialForm from "../Material/MaterialForm";
import ProblemForm from "../Problem/ProblemForm";
import Material from "../Material";
import Quiz from "../Quiz";
import Problem from "../Problem";
import api from "../../services/api";

const ModuleForm = ({ openForm, closeModal, courseId, startId }) => {

  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [problems, setProblems] = useState([]);
  const [id, setId] = useState(0);
  const [confirmAttribute, setConfirmAttribute] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [openQuizForm, setOpenQuizForm] = useState(false);
  const [openMaterialForm, setOpenMaterialForm] = useState(false);
  const [openProblemForm, setOpenProblemForm] = useState(false);
  const [attributeId, setAttributeId] = useState(0);

  const [loading, setLoading] = useState(false);

  const getDetails = useCallback((moduleId) => {
    api.get(`/modules/${moduleId}`).then(res => {
      setName(res.data.data.name);
      setNumber(res.data.data.number);
      setMaterials(res.data.data.materials);
      setQuizzes(res.data.data.quizzes);
      setProblems(res.data.data.problems);
    }).catch(() => {
      toast.error("Falha ao carregar modulo");
      closeModal();
    });
  }, [closeModal]);

  useEffect(() => {
    if(startId) {
      setId(startId)
      getDetails(startId)
    }
  }, [startId, getDetails]);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setNumber(0);

    const data = {
      name,
      number,
      CourseId: courseId
    };

    let request, op;
    if (id) {
      request = api.put(`/modules/${id}`, data);
      op = "editado";
    } else {
      request = api.post("/modules", data);
      op = "criado";
    }

    request.finally(() => {
      setLoading(false);
    }).then(() => {
      toast.success(`Módulo ${op} com sucesso`);
      closeModal();
    }).catch(() => {
      toast.error("Falha ao salvar módulo");
    });
  }

  const openAttributeForm = (attribute, value) => {
    if(attribute === "quiz") {
      setOpenQuizForm(value);
    } else if (attribute === "material") {
      setOpenMaterialForm(value);
    } else {
      setOpenProblemForm(value);
    }
  }

  const confirm = (attribute) => {
    if(id) {
      openAttributeForm(attribute, true);
    } else {
      setConfirmModal(true);
    }
    setConfirmAttribute(attribute);
  }

  const confirmSave = () => {
    setLoading(true);
    setNumber(0);

    const data = {
      name,
      number,
      CourseId: courseId
    };
    api.post("/modules", data).finally(() => {
      setLoading(false);
    }).then((res) => {
      setId(res.data.data.id);
      toast.success(`Módulo criado com sucesso`);
      setConfirmModal(false);
      setConfirmAttribute(false);
      openAttributeForm(confirmAttribute, true);
    }).catch(() => {
      toast.error("Falha ao salvar módulo");
    });
  }

  const handleClose = () => {
    setConfirmModal(false);
  }

  const closeAttributeModal = () => {
    openAttributeForm(confirmAttribute, false);
    getDetails(id);
    setAttributeId(0);
  }

  const changedItem = () => {
    getDetails(id);
  }

  const edit = (attribute, id) => {
    setAttributeId(id);
    openAttributeForm(attribute, true);
    setConfirmAttribute(attribute);
  }

  return (
    <Modal size="lg" className={confirmModal || openQuizForm || openMaterialForm || openProblemForm ?"o-70":""} show={openForm} onHide={() => closeModal()}>
      <Container>
        <Form onSubmit={submit}>
          <Modal.Header closeButton>
            <span className="f4 b"> {id? "Editar" : "Adicionar"} módulo</span>
          </Modal.Header>

          <Col md={{ span: 6, offset: 3 }} className="pt3">
            <Form.Group controlId="name" className="pb3">
              <p className="tc b">Nome do módulo</p>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
          </Col>

          <Modal className="" show={confirmModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <span className="f4 b"> Confirme </span>
            </Modal.Header>
            <Modal.Body>Para continuar é necessário salvar o módulo, deseja continuar?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="success" onClick={confirmSave}>
                Salvar
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="pt3">
            <Button onClick={() => confirm("quiz")}> Adicionar quiz </Button>
          </div>
          <ListGroup className="pt1">
            <ListGroup.Item variant="dark">Quizzes</ListGroup.Item>
            { 
              quizzes.map(e =>
                <Quiz key={"quizkey"+e.id} quiz={e} changedItem={changedItem} editQuiz={edit}></Quiz>
              )
            }
            {
              !quizzes.length ? 
                <ListGroup.Item>Não há quizzes cadastrados neste curso</ListGroup.Item>
              : null
            }
          </ListGroup>

          <div className="pt3">
            <Button  onClick={() => confirm("material")}> Adicionar material </Button>
          </div>
          <ListGroup className="pt1">
            <ListGroup.Item variant="dark">Materiais</ListGroup.Item>
            { 
              materials.map(e =>
                <Material key={"materialkey"+e.id} material={e} changedItem={changedItem} editMaterial={edit}></Material>
              )
            }
            {
              !materials.length ? 
                <ListGroup.Item>Não há materiais cadastrados neste curso</ListGroup.Item>
              : null
            }
          </ListGroup>

          <div className="pt3">
            <Button  onClick={() => confirm("problem")}> Adicionar problema </Button>
          </div>
          <ListGroup className="pt1 pb3">
            <ListGroup.Item variant="dark">Problemas</ListGroup.Item>
            { 
              problems.map(e =>
                <Problem key={"problemkey"+e.id} problem={e} changedItem={changedItem} editProblem={edit}></Problem>
              )
            }
            {
              !problems.length ? 
                <ListGroup.Item>Não há problemas cadastrados neste curso</ListGroup.Item>
              : null
            }
          </ListGroup>
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
        { openMaterialForm ?
          <MaterialForm closeModal={closeAttributeModal} moduleId={id} id={attributeId}></MaterialForm>
          : null
        }
        { openQuizForm ?
          <QuizForm closeModal={closeAttributeModal} moduleId={id} id={attributeId}></QuizForm>
          : null
        }
        { openProblemForm ?
          <ProblemForm closeModal={closeAttributeModal} moduleId={id} id={attributeId}></ProblemForm>
          : null
        }
      </Container>
    </Modal>
  );
};

export default ModuleForm;