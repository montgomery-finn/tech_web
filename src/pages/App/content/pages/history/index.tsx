import React, { useEffect, useMemo, useState } from 'react';
import { Container } from './styles';
import api from '../../../../../services/api';
import OrderDTO from '../../../../../DTOs/OrderDTO';
import Notification from './notification';

const History: React.FC = () => {

  const [history, setHistory] = useState<OrderDTO[]>([]);

  useEffect(() => {
    async function execute(){
      const response = await api.get<OrderDTO[]>('/orders')

      console.log("aqui está o historico => ", response.data)

      setHistory(response.data);
    }

    execute();
  }, [])

  return <Container>
    {history.map(order => (<Notification key={order.id} order={order}/>))}
  </Container>
}

export default History;