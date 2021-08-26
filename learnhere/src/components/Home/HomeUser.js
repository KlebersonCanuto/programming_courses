import { useEffect, useState } from "react";
import { Row, Container, ListGroup } from "react-bootstrap";
import CourseCard from "../Course/CourseCard";
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
  }, []);

  return (
    <Container>
      <p className="tc f3 b">Seja bem-vindo!</p>
      <p className="f4">Aproveite o LearnHere, aprenda e pratique programação com quizzes, juíz de software e console com debug de forma livre!</p>
      <ListGroup className="pt3">
        <ListGroup.Item className="tc" active>Cursos</ListGroup.Item>
      </ListGroup>
      {
        !courses.length ? 
          <ListGroup.Item className="tc">Não há cursos cadastrados</ListGroup.Item>
        : null
      }
      <Row>
        {
          courses.map(e => 
            <CourseCard key={e.id} course={e}></CourseCard>
          )
        }
      </Row>
    </Container>
  );
};

export default HomeAdmin;