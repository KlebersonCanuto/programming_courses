import { useEffect, useState } from "react";
import { Accordion, Button, Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import CourseDetails from "../Course/CourseDetails";
import api from "../../services/api";

const HomeAdmin = () => {
  
  const [courses, setCourses] = useState([]);

  const getCourses = () => {
    api.get("/courses").then(res => {
      setCourses(res.data.data);
    });
  }

  useEffect(() => {
    getCourses();
  }, [])

  return (
    <Container>
      <p className="tc f3 b">Seja bem-vindo!</p>
      <p className="f4">Edite, visualize ou cadastre cursos.</p>
      <Link to="new_course"><Button> Novo curso </Button></Link>
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
    </Container>
  );
};

export default HomeAdmin;