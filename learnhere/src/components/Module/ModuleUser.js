import { useState, useEffect } from 'react';
import { Row, ListGroup, Container } from 'react-bootstrap';
import { BsCheckCircleFill } from 'react-icons/bs'
import { toast } from 'react-toastify';
import QuizCard from '../Quiz/QuizCard';
import MaterialCard from '../Material/MaterialCard';
import ProblemCard from '../Problem/ProblemCard';
import api from '../../services/api';

const ModuleUser = ({ match }) => {

  const [details, setDetails] = useState({ quizzes: [], materials: [], problems: [] });
  const id = match.params.id;

  useEffect(() => {
    api.get(`/modules/${id}`).then((res) => {
      console.log(res.data.data)
      setDetails(res.data.data);
    }).catch(() => {
      toast.error('Falha ao obter detalhes do módulo');
    })
  }, [id])

  return (
    <Container>
      <p className="f4 pb2 tc"> <span className="b"> Módulo: </span> {details.name} { details.done ?  <BsCheckCircleFill className="green" title="Concluído"/> : null } </p>

      <ListGroup className="pt3">
        <ListGroup.Item className="tc" active> Questões </ListGroup.Item>
      </ListGroup>
      {
        !details.quizzes.length ? 
          <ListGroup.Item className="tc">Não há quizzes cadastrados neste módulo</ListGroup.Item>
        : null
      }
      <Row>
        {
          details.quizzes.map(e =>
            <QuizCard key={"quizkey"+e.id} quiz={e}/>
          )
        }
      </Row>

      <ListGroup className="pt3">
        <ListGroup.Item className="tc" active> Materiais </ListGroup.Item>
      </ListGroup>
      {
        !details.materials.length ? 
          <ListGroup.Item className="tc">Não há materiais cadastrados neste módulo</ListGroup.Item>
        : null
      }
      <Row>
        {
          details.materials.map(e =>
            <MaterialCard key={"materialkey"+e.id} material={e}/>
          )
        }
      </Row>

      <ListGroup className="pt3">
        <ListGroup.Item className="tc" active> Problemas </ListGroup.Item>
      </ListGroup>
      {
        !details.problems.length ? 
          <ListGroup.Item className="tc">Não há problemas cadastrados neste módulo</ListGroup.Item>
        : null
      }
      <Row>
        {
          details.problems.map(e =>
            <ProblemCard key={"problemkey"+e.id} problem={e}/>
          )
        }
      </Row>
    </Container>
  );
};

export default ModuleUser;