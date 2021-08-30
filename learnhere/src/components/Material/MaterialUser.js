import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Parser from 'html-react-parser';

const MaterialUser = ({ match }) => {

  const [details, setDetails] = useState({});
  const history = useHistory();
  const id = match.params.id;

  useEffect(() => {
    api.get(`/materials/${id}`).then((res) => {
      setDetails(res.data.data);
    }).catch(() => {
      toast.error('Falha ao obter material');
    })
  }, [id])

  const markAsRead = () => {
    api.post(`/materials/${id}`).then(() => {
      toast.success('Material marcado como visto com sucesso');
      history.push(`/module/${details.ModuleId}`);
    }).catch(() => {
      toast.error('Falha ao marcar como visto');
    })
  }

  return (
    <Container>
      <p className="f4 pb2 tc"> <span className="b"> Título: </span> {details.title} </p>
      <div>
        {details.content ? Parser(details.content) : null}
      </div>
      <div className="tc">
        <Button onClick={()=> markAsRead()} variant="dark">
          Marcar como visto
        </Button>
      </div>
    </Container>
  );
};

export default MaterialUser;