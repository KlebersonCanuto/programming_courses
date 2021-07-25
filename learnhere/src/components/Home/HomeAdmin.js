import { useEffect, useState } from "react";
import { Accordion, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CourseDetails from "../Course/CourseDetails";
import api from "../../services/api";

const HomeAdmin = () => {
  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses").then(res => {
      setCourses(res.data.data);
    });
  }, [])

  return (
    <Container>
      <p className="tc f3 b">Seja bem-vindo!</p>
      <p className="f4">Edite, visualize ou cadastre cursos</p>
      <Link to="new_course"><Button> Novo curso </Button></Link>
      <Accordion>
        {
          courses.map(e => 
            <CourseDetails course={e}></CourseDetails>
          )
        }
      </Accordion>
    </Container>
  );
};

export default HomeAdmin;