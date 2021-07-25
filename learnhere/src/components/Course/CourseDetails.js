import { useState } from 'react';
import { Button, Row, Col, Accordion } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../../services/api';

const CourseForm = ({ course }) => {

  const history = useHistory();
  const [details, setDetails] = useState({});

  const remove = (id) => {
    api.delete(`/courses/${id}`).then(() => {
      history.go(0);
    }).catch(() => {
      toast.success("Falha ao deletar curso");
    })
  }

  const getDetails = (id) => {
    api.get(`/courses/${id}`).then((res) => {
      setDetails(res.data.data);
    }).catch(() => {
      toast.success("Falha ao obter detalhes do curso");
    })
  }

  return (
    <Accordion.Item eventKey={String(course.id)}>
      <Accordion.Header onClick={() => getDetails(course.id)}>{course.name}</Accordion.Header>
      <Accordion.Body>
      <Row>
        <Col> <Button> Adicionar módulo </Button> </Col>
        <Col className="tr"> <Button>Editar</Button> <Button variant="danger" onClick={() => remove(course.id)}>Deletar</Button></Col>
      </Row>               
        <p className="f4"> Curso: {details.name}</p>
        <p className="f5">MODULOS</p>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default CourseForm;