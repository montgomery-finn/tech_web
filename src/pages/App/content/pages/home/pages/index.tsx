import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './styles';
import OrderDTO from '../DTOs/OrderDTO';
import Notification from './notification'
import {useToast} from '../../../../../../hooks/toast';
import { getDatabase, ref, onValue, onChildAdded} from "firebase/database";
import api from '../../../../../../services/api';

const Home: React.FC = () => {

  const [notifications, setNotifications] = useState<OrderDTO[]>([]);

  const {addToast} = useToast();

  const getOrder = useCallback(async (id: string) => {
    const response = await api.get<OrderDTO>(`/Orders/${id}`)

    setNotifications(notifications => [...notifications, response.data])
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'NewOrders');
    
    onChildAdded(starCountRef, (snapshot) => {
      const data = snapshot.val();

      getOrder(data.id);
    });
  }, [getOrder])

  const removeOrder = useCallback((id: string) => {
    setNotifications(o => o.filter(o => o.id !== id))
  }, [])

  return <Container>
    {notifications.map(order => (<Notification onRemoveOrder={removeOrder} key={order.id} order={order}/>))}
  </Container>
}

export default Home;