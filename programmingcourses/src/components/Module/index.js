import { Button, Row, Col, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';

const Module = ({ module, changedItem, editModule, locked }) => {

  const remove = (id) => {
    api.delete(`/modules/${id}`).then(() => {
      changedItem();
    }).catch(() => {
      toast.error('Falha ao deletar módulo');
    })
  }

  return (
    <ListGroup.Item>
      <Row>
        <Col md="6"> 
          <p className="b"> {module.name} </p>
        </Col>
        <Col md="6" className="tr">
          <Button onClick={() => editModule(module.id)}> Editar </Button> {} 
          <Button variant="danger" onClick={() => {remove(module.id)}} disabled={locked}> Remover </Button> 
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default Module;