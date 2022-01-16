import { useState, useEffect } from 'react';
import { Row, ListGroup, Container, ProgressBar } from 'react-bootstrap';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import ModuleCard from '../Module/ModuleCard';
import api from '../../services/api';

const CourseUser = ({ match }) => {

  const [details, setDetails] = useState({ modules: [] });
  const id = match.params.id;

  useEffect(() => {
    api.get(`/courses/${id}`).then((res) => {
      setDetails(res.data.data);
    }).catch(() => {
      toast.error('Falha ao obter detalhes do curso');
    })
  }, [id])

  return (
    <Container>
      <p className="f4 pb2 tc"> <span className="b"> Curso: </span> {details.name} { details.progress === 1 ?  <BsFillPatchCheckFill className="green" title="Concluído"/> : null } </p>

      <ListGroup className="pt3">
        <ListGroup.Item className="tc" active> Módulos </ListGroup.Item>
      </ListGroup>
      <ProgressBar variant={details.progress === 1 ? "success" : "info"} striped now={details.progress*100} label={`${details.progress*100}%`} />
      {
        !details.modules.length ? 
          <ListGroup.Item className="tc">Não há módulos cadastrados neste curso</ListGroup.Item>
        : null
      }
      <Row>
        {
          details.modules.map(e =>
            <ModuleCard key={"modulekey"+e.id} module={e}/>
          )
        }
      </Row>
    </Container>
  );
};

export default CourseUser;