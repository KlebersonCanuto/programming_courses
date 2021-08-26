import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MaterialCard = ({ material }) => {

  return (
    <Col md={3} className="pt2">
      <Link to={`/material/${material.id}`} className="no-underline">
        <Card className="dim">
          <Card.Body>
            <Card.Text className="f4 tc black">
              {material.title}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default MaterialCard;