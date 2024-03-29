import { useState } from 'react';
import { Button, Row, Col, Accordion, ListGroup, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { BsLockFill } from 'react-icons/bs';
import ModuleForm from '../Module/ModuleForm';
import Module from '../Module';
import api from '../../services/api';
import CourseForm from './CourseForm';

const CourseDetails = ({ course, updatedItem }) => {

  const [details, setDetails] = useState({modules: []});
  const [openCourseForm, setOpenCourseForm] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [confirmLocked, setConfirmLocked] = useState(false);
  const [confirmUnlocked, setConfirmUnlocked] = useState(false);
  const [moduleFormId, setModuleFormId] = useState(null);

  const remove = (id) => {
    api.delete(`/courses/${id}`).then(() => {
      updatedItem();
    }).catch(() => {
      toast.error('Falha ao deletar curso');
    })
  }

  const getDetails = (id) => {
    api.get(`/courses/details/${id}`).then((res) => {
      setDetails(res.data.data);
    }).catch(() => {
      toast.error('Falha ao obter detalhes do curso');
    })
  }

  const closeModal = () => {
    setOpenForm(false);
    setOpenCourseForm(false);
    getDetails(course.id);
    setModuleFormId(null);
  } 

  const changedModule = () => {
    getDetails(course.id);
  }

  const editModule = (id) => {
    setOpenForm(true);
    setModuleFormId(id);
  }
  
  const lockCourse = () => {
    api.patch(`/courses/${course.id}`).then(() => {
      setConfirmLocked(false);
      updatedItem();
    }).catch(() => {
      toast.error('Falha ao finalizar curso');
    })
  }

  const unlockCourse = () => {
    api.patch(`/courses/unlock/${course.id}`).then(() => {
      setConfirmUnlocked(false);
      updatedItem();
    }).catch(() => {
      toast.error('Falha ao desbloquear curso');
    })
  }

  return (
    <Accordion.Item eventKey={"course"+course.id}>
      <Accordion.Header onClick={() => getDetails(course.id)}>{course.name} { course.locked ? <BsLockFill className="red" title="Finalizado"/> : null } </Accordion.Header>
      <Accordion.Body>
      
      <Row>
        <Col> <p className="f4 pb2"> <span className="b">Curso:</span> {details.name}</p> </Col>
        <Col className="tr"> 
          {
            course.locked === false ? 
              <Button onClick={() => setConfirmLocked(true)}> Finalizar </Button>
            : <Button onClick={() => setConfirmUnlocked(true)}> Desbloquear </Button>
          } {}
          <Button onClick={() => setOpenCourseForm(true)}> Editar </Button> {}
          <Button variant="danger" onClick={() => remove(course.id)}>Excluir</Button>
        </Col>
      </Row>
      
      <Modal show={confirmLocked} onHide={() => setConfirmLocked(false)}>
        <Modal.Header closeButton>
          <strong>Finalizar Curso</strong>
        </Modal.Header>

        <Modal.Body>
          <p>Ao finalizar, não será possível criar mais módulos, quizzes, problemas e materiais, Deseja continuar?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => setConfirmLocked(false)}>Fechar</Button>
          <Button variant="success" onClick={lockCourse}>Finalizar</Button>
        </Modal.Footer>
      </Modal>   

      <Modal show={confirmUnlocked} onHide={() => setConfirmUnlocked(false)}>
        <Modal.Header closeButton>
          <strong>Desbloquear Curso</strong>
        </Modal.Header>

        <Modal.Body>
          <p>Ao desbloquear, a pontuação de usuários que já concluiram o curso ficará inconsistente. Deseja continuar?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => setConfirmUnlocked(false)}>Fechar</Button>
          <Button variant="success" onClick={unlockCourse}>Desbloquear</Button>
        </Modal.Footer>
      </Modal>   

      <Button onClick={() => setOpenForm(true)} disabled={course.locked}> Adicionar módulo </Button>    
      {
        openCourseForm ? 
         <CourseForm closeModal={closeModal} id={course.id}></CourseForm>
        : null
      } 
      {
        openForm ? 
         <ModuleForm closeModal={closeModal} courseId={course.id} startId={moduleFormId} locked={course.locked}></ModuleForm>
        : null
      }     
      <ListGroup className="pt1">
        <ListGroup.Item variant="dark">Módulos</ListGroup.Item>
        { 
          details.modules.map(e =>
            <Module key={"modulekey"+e.id} module={e} changedItem={changedModule} editModule={editModule} locked={course.locked}/>
          )
        }
        {
          !details.modules.length ? 
            <ListGroup.Item>Não há módulos cadastrados neste curso</ListGroup.Item>
          : null
        }
      </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default CourseDetails;