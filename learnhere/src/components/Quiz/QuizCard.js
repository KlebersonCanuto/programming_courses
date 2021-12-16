import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';

const QuizCard = ({ quiz }) => {

  return (
    <Col md={3} className="pt2">
      <Link to={`/quiz/${quiz.id}`} className="no-underline">
        <Card className="dim">
          <Card.Body>
            <Card.Text className="f4 tc black">
              {quiz.title} { quiz.done ?  <BsCheckCircleFill className="green" title="Concluído"/> : null }
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default QuizCard;