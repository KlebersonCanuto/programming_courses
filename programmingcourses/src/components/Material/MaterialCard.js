import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillPatchCheckFill, BsFillPatchPlusFill } from 'react-icons/bs';

const MaterialCard = ({ material }) => {
  
  return (
    <Col md={3} className="pt2">
      <Link to={`/material/${material.id}`} className="no-underline">
        <Card className="dim">
          <Card.Body>
            <Card.Text className="f4 tc black">
              {material.title} { material.complementary ?  <BsFillPatchPlusFill className="blue" title="Extra"/> : null } { material.done ?  <BsFillPatchCheckFill className="green" title="Concluído"/> : null }
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default MaterialCard;