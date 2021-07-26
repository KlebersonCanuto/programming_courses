import { Container } from 'react-bootstrap';
import CourseForm from './CourseForm';

const Course = () => {

  return (
    <Container>
      <p className="tc f3 b"> Cadastre o curso </p>
      <CourseForm></CourseForm>
    </Container>
  );
};

export default Course;