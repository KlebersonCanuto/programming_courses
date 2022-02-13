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
        Aproveite o Programming Courses, aprenda e pratique programação com quizzes e juíz de 
        software, que oferece um sistema de oráculo para validar se seu pensamento 
        está correto ou não e uma forma de debugar seu código com o Python Tutor para 
        entender melhor como  ele está sendo executado. No momento é possivel aprender 
        e praticar apenas a linguagem Python.
      </p>
      <p className="f4" align="justify">
        Além disso, possuimos um sistema de pontuação com um ranking. É possível obter pontos
        de 4 maneiras diferentes:
        <li>Ao marcar um material como concluído, você recebe 1 ponto</li>
        <li>Ao responder corretamente uma questão, você recebe de 3 a 5 pontos, de acordo com a quantidade de tentativas, pedir dica é equivalente a uma tentativa </li>
        <li>Ao resolver corretamente um problema, você recebe de 5 a 10 pontos, de acordo com a quantidade de tentativas</li>
        <li>Ao testar <strong>Entrada e Saída</strong> de um oráculo <strong>antes</strong> de resolver a questão, você recebe 2 pontos </li>
        <li>Além disso, ao concluir todos os materiais de um módulo, você recebe 1 ponto, ao concluir todos quizzes mais 2 pontos, e 2 pontos ao concluir todos os problemas.
          Concluir um módulo resultará em 3 pontos, e um curso em outros 10 pontos  </li>
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