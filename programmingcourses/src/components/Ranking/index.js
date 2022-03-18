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
      <p className="tc f4 b"> Rank dos usuários </p>
      <Table bordered striped hover variant="dark" className="tc">
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
          {
            !users.length ? 
              <tr>
                <td colspan={3}>Nenhum usuário pontuou até o momento</td>
              </tr>
            : null
          }
        </tbody>
      </Table>

      <p className="tc f5 b"> Regras de pontuação </p>
      <Table bordered variant="light" className="tc f7">
        <thead>
          <tr>
            <th>Ação</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ver um material</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Responder corretamente uma questão </td>
            <td>3-5*</td>
          </tr>
          <tr>
            <td>Responder corretamente um problema </td>
            <td>5-10**</td>
          </tr>
          <tr>
            <td>Testar entrada e saída do oráculo*** </td>
            <td>2 (bônus)</td>
          </tr>
          <tr>
            <td>Ver todos materiais obrigatórios de um módulo </td>
            <td>1</td>
          </tr>
          <tr>
            <td>Responder corretamente todas as questões de um módulo </td>
            <td>2</td>
          </tr>
          <tr>
            <td>Responder corretamente todos os problemas de um módulo </td>
            <td>2</td>
          </tr>
          <tr>
            <td>Concluir um módulo </td>
            <td>3</td>
          </tr>
          <tr>
            <td>Concluir um curso </td>
            <td>10</td>
          </tr>
        </tbody>
      </Table>
      <p className="f7 gray"> * De acordo com a quantidade de tentativas (pedir dica conta como uma tentativa). </p>
      <p className="f7 gray"> ** De acordo com a quantidade de tentativas. </p>
      <p className="f7 gray"> *** Apenas sem tentativas prévias de oráculo e problema, válido apenas para o modo entrada e saída. </p>
    </Container>
  );
};

export default Ranking;