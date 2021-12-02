import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './styles';
import NewOrderNotificationDTO from '../DTOs/NewOrderNotificationDTO';

interface StreamResponse {
  item: NewOrderNotificationDTO;
  action: string;
}

const Home: React.FC = () => {

  const [orders, setOrders] = useState<NewOrderNotificationDTO[]>([]);

  useEffect(() => {
    console.log("esse é o orders => ", orders);
  }, [orders]);

  const read = useCallback(async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
    try{
      const { value, done } = await reader.read();

      if (done) {
        console.log("The stream was already closed!");
      } else {

        const decodedString = new TextDecoder().decode(value);

        const decodedValue: StreamResponse[] = JSON.parse(decodedString);

        decodedValue.forEach(d => {
          if(d.action === "Item added"){
            setOrders(o => [...o, d.item])
          }
        })

        read(reader);
      }
    } catch (e) {
      console.error("The stream became errored and cannot be read from!", e)
    }
  }, [])

  useEffect(() => {
    fetch('http://localhost:28464/notifications')
    .then(response => {
      const reader = response.body?.getReader();

      read(reader as ReadableStreamDefaultReader<Uint8Array>);
    })
  }, [read])

  return <Container>
    {orders.map(order => (<p key={order.ID}>{JSON.stringify(order)}</p>))}
  </Container>
}

export default Home;