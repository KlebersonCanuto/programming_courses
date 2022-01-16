import { useState, useEffect } from 'react';
import { Row, ListGroup, Container, ProgressBar } from 'react-bootstrap';
import { BsFillPatchCheckFill } from 'react-icons/bs'
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
      setDetails(res.data.data);
    }).catch(() => {
      toast.error('Falha ao obter detalhes do módulo');
    })
  }, [id])

  return (
    <Container>
      <p className="f4 pb2 tc"> <span className="b"> Módulo: </span> {details.name} { details.progressMaterials === 1 && details.progressQuizzes === 1 && details.progressProblems === 1 ?  <BsFillPatchCheckFill className="green" title="Concluído"/> : null } </p>

      <ListGroup className="pt3">
        <ListGroup.Item className="tc" active> Questões </ListGroup.Item>
      </ListGroup>
      {
        !details.quizzes.length ? 
          <ListGroup.Item className="tc">Não há quizzes cadastrados neste módulo</ListGroup.Item>
        : 
          <ProgressBar variant={details.progressQuizzes === 1 ? "success" : "info"} striped now={details.progressQuizzes*100} label={`${details.progressQuizzes*100}%`} />  
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
        : 
          <ProgressBar variant={details.progressMaterials === 1 ? "success" : "info"} striped now={details.progressMaterials*100} label={`${details.progressMaterials*100}%`} />
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
        :
          <ProgressBar variant={details.progressProblems === 1 ? "success" : "info"} striped now={details.progressProblems*100} label={`${details.progressProblems*100}%`} />
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