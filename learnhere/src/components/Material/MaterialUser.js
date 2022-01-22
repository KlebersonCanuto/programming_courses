import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { toast } from 'react-toastify';
import api from '../../services/api';
import ReactPlayer from 'react-player/youtube'
import Parser from 'html-react-parser';
import './player.css'

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
      <p className="f4 tc"> <span className="b"> Título: </span> {details.title} { details.done ?  <BsFillPatchCheckFill className="green" title="Concluído"/> : null } </p>
      <div>
        {details.content ? Parser(details.content) : null}
      </div>

      <div className="player-wrapper pb2 relative">
        { details.video_link ? 
          <ReactPlayer className="absolute center-player" controls={true} width="854px"  height="480px"  url={details.video_link}/> 
          : null
        }
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