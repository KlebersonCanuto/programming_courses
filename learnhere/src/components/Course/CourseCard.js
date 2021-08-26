import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {

  return (
    <Col md={3} className="pt2">
      <Link to={`/course/${course.id}`} className="no-underline">
        <Card className="dim">
          <Card.Body>
            <Card.Text className="f4 tc black">
              {course.name}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default CourseCard;