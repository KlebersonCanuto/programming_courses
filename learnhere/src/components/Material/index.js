import { Button, Row, Col, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';

const Material = ({ material, changedItem, editMaterial }) => {

  const remove = (id) => {
    api.delete(`/materials/${id}`).then(() => {
      changedItem();
    }).catch(() => {
      toast.error('Falha ao deletar material');
    })
  }

  return (
    <ListGroup.Item>
      <Row>
        <Col md="6"> 
          <p className="b"> {material.title} </p>
        </Col>
        <Col md="6" className="tr">
          <Button onClick={() => editMaterial('material', material.id)}> Editar </Button> {} 
          <Button variant="danger" onClick={() => {remove(material.id)}}> Remover </Button> 
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default Material;