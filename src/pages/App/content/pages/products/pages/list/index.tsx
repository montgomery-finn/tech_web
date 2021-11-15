import React from 'react';
import { Container } from './styles';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const List: React.FC = () => {
const history = useHistory();

  return (
    <Container>
      <Button onClick={() => history.push("products/create")}>Adicionar produto</Button>
      <span>essa é a lista</span>
    </Container>
  );
}

export default List;