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
        Aproveite o Programming Courses para aprender e praticar programação Python! 
        Use o nosso banco de questões e receba feedback do nosso juiz online. Para
        fazer um curso, é necessário estar logado, caso ainda não tenha uma conta,
        cadastre-se no site.
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