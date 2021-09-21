import { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import api from '../../services/api';

const Ranking = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users/ranking').then(res => {
      setUsers(res.data.rank);
    });
  }, [])

  return (
    <Container>
      <p className="tc f3 b"> Rank dos usuários </p>
      <Table striped bordered hover variant="dark" className="tc">
        <thead>
          <tr>
            <th>#</th>
            <th>Usuário</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((e, index) => 
              <tr key={index}>
                <td>{index+1}</td>
                <td>{e.username}</td>
                <td>{e.points}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </Container>
  );
};

export default Ranking;