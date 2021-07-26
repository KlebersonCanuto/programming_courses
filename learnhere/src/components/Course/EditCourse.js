import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import CourseForm from './CourseForm';

const Course = () => {

  const { id } = useParams();

  return (
    <Container>
      <p className="tc f3 b"> Edite o curso </p>
      <CourseForm id={id}></CourseForm>
    </Container>
  );
};

export default Course;