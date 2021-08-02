import { useEffect, useState } from "react";
import { Accordion, Button, Container, ListGroup } from "react-bootstrap";
import CourseDetails from "../Course";
import CourseForm from "../Course/CourseForm";
import api from "../../services/api";

const HomeAdmin = () => {
  
  const [courses, setCourses] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const getCourses = () => {
    api.get("/courses").then(res => {
      setCourses(res.data.data);
    });
  }

  useEffect(() => {
    getCourses();
  }, []);

  const closeModal = () => {
    setOpenForm(false);
    getCourses();
  } 

  return (
    <Container>
      <p className="tc f3 b">Seja bem-vindo!</p>
      <p className="f4">Edite, visualize ou cadastre cursos.</p>
      <Button onClick={() => setOpenForm(true)}> Novo curso </Button>
      <ListGroup className="pt3">
        <ListGroup.Item active>Cursos</ListGroup.Item>
      </ListGroup>
      <Accordion>
        {
          courses.map(e => 
            <CourseDetails key={e.id} course={e} removedItem={getCourses}></CourseDetails>
          )
        }
      </Accordion>
      {
        !courses.length ? 
          <ListGroup.Item>Não há cursos cadastrados</ListGroup.Item>
        : null
      }

      {
        openForm ? 
         <CourseForm closeModal={closeModal}></CourseForm>
        : null
      }    
    </Container>
  );
};

export default HomeAdmin;