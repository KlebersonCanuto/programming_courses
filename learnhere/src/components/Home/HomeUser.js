import { useEffect, useState } from 'react';
import { Row, Container, ListGroup } from 'react-bootstrap';
import CourseCard from '../Course/CourseCard';
import api from '../../services/api';

const HomeAdmin = () => {
  
  const [courses, setCourses] = useState([]);

  const getCourses = () => {
    api.get('/courses').then(res => {
      setCourses(res.data.data);
    });
  }

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <Container>
      <p className="tc f3 b">Seja bem-vindo!</p>
      <p className="f4" align="justify">
      Aproveite o Programming Courses, aprenda e pratique programação com questões e juíz de 
      software, que oferece um sistema de oráculo para validar se seu pensamento está correto 
      ou não e uma forma de debugar seu código com o Python Tutor e entender melhor como ele 
      está sendo executado, além de um sistema de pontuação com ranqueamento. No momento é possivel 
      aprender e praticar apenas a linguagem Python.
      </p>
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