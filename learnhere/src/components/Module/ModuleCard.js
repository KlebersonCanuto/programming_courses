import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ModuleCard = ({ module }) => {
  
  return (
    <Col md={3} className="pt2">
      <Link to={`/module/${module.id}`} className="no-underline">
        <Card className="dim">
          <Card.Body>
            <Card.Text className="f4 tc black">
              {module.name}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default ModuleCard;