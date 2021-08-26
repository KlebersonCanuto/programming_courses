import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProblemCard = ({ problem }) => {
  
  return (
    <Col md={3} className="pt2">
      <Link to={`/problem/${problem.id}`} className="no-underline">
        <Card className="dim">
          <Card.Body>
            <Card.Text className="f4 tc black">
              {problem.title}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default ProblemCard;