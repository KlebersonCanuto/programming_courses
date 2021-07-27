import { useState } from 'react';
import { Button, Row, Col, Accordion, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import ModuleForm from '../Module/ModuleForm';
import Module from '../Module';
import api from '../../services/api';

const CourseDetails = ({ course, removedItem }) => {

  const [details, setDetails] = useState({modules: []});
  const [openForm, setOpenForm] = useState(false);
  const [moduleFormId, setModuleFormId] = useState(null);

  const remove = (id) => {
    api.delete(`/courses/${id}`).then(() => {
      removedItem();
    }).catch(() => {
      toast.error("Falha ao deletar curso");
    })
  }

  const getDetails = (id) => {
    api.get(`/courses/${id}`).then((res) => {
      setDetails(res.data.data);
    }).catch(() => {
      toast.error("Falha ao obter detalhes do curso");
    })
  }

  const closeModal = () => {
    setOpenForm(false);
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

  return (
    <Accordion.Item eventKey={"course"+course.id}>
      <Accordion.Header onClick={() => getDetails(course.id)}>{course.name}</Accordion.Header>
      <Accordion.Body>
      
      <Row>
        <Col> <p className="f4 pb2"> <span className="b">Curso:</span> {details.name}</p> </Col>
        <Col className="tr"> <Link to={`/edit_course/${course.id}`}><Button> Editar </Button></Link> <Button variant="danger" onClick={() => remove(course.id)}>Deletar</Button></Col>
      </Row>      

      <Button onClick={() => setOpenForm(true)}> Adicionar módulo </Button>         
      <ModuleForm openForm={openForm} closeModal={closeModal} courseId={course.id} id={moduleFormId}></ModuleForm>
      <ListGroup className="pt1">
        <ListGroup.Item variant="dark">Módulos</ListGroup.Item>
        { 
          details.modules.map(e =>
            <Module key={"modulekey"+e.id} module={e} changedItem={changedModule} editModule={editModule}/>
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