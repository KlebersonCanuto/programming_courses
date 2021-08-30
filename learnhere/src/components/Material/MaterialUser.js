import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Parser from 'html-react-parser';

const MaterialUser = ({ match }) => {

  const [details, setDetails] = useState({});
  const id = match.params.id;

  useEffect(() => {
    api.get(`/materials/${id}`).then((res) => {
      setDetails(res.data.data);
    }).catch(() => {
      toast.error('Falha ao obter material');
    })
  }, [id])

  return (
    <Container>
      <p className="f4 pb2 tc"> <span className="b"> Título: </span> {details.title} </p>
      <div>
        {details.content ? Parser(details.content) : null}
      </div>
    </Container>
  );
};

export default MaterialUser;