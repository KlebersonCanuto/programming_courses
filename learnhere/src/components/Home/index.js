import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import api from '../../services/api';

const Home = () => {

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

      <p className="f4">
        Cursos disponíveis:
      </p>
      {
        courses.map(e => 
          <li className="f5">
            {e.name}
          </li>
        )
      }
    </Container>
  );
};

export default Home;