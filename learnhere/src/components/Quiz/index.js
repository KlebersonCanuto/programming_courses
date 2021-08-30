import { Button, Row, Col, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';

const Quiz = ({ quiz, changedItem, editQuiz }) => {

  const remove = (id) => {
    api.delete(`/quizzes/${id}`).then(() => {
      changedItem();
    }).catch(() => {
      toast.error('Falha ao deletar quiz');
    })
  }

  return (
    <ListGroup.Item>
      <Row>
        <Col md="6"> 
          <p className="b"> {quiz.title} </p>
        </Col>
        <Col md="6" className="tr">
          <Button onClick={() => editQuiz('quiz', quiz.id)}> Editar </Button> {} 
          <Button variant="danger" onClick={() => {remove(quiz.id)}}> Remover </Button> 
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default Quiz;