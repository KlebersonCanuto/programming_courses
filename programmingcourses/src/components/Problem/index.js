import { Button, Row, Col, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';

const Problem = ({ problem, changedItem, editProblem, locked }) => {

  const remove = (id) => {
    api.delete(`/problems/${id}`).then(() => {
      changedItem();
    }).catch(() => {
      toast.error('Falha ao deletar problema');
    })
  }

  return (
    <ListGroup.Item>
      <Row>
        <Col md="6"> 
          <p className="b"> {problem.title} </p>
        </Col>
        <Col md="6" className="tr">
          <Button onClick={() => editProblem("problem", problem.id)}> Editar </Button> {} 
          <Button variant="danger" onClick={() => {remove(problem.id)}} disabled={locked}> Remover </Button> 
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default Problem;