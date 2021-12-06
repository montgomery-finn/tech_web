import React, { useCallback } from "react";
import { ButtonsContainer, Button, Customer } from './styles';
import OrderDTO from '../../DTOs/OrderDTO';
import { Card, Table } from 'react-bootstrap';
import { FaBell, FaCheck } from 'react-icons/fa'
import api from '../../../../../../../services/api';
import { useToast } from "../../../../../../../hooks/toast";
import { getDatabase, ref, set } from "firebase/database";

interface NotificationProps {
  order: OrderDTO;
  onRemoveOrder: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({ order, onRemoveOrder }) => {

  const { addToast } = useToast();

  const handleFinishOrder = useCallback(async () => {
    console.log("Vai finalizar => ", order.id)

    try{
      await api.post("Orders/Finish", { orderId: order.id });

      const db = getDatabase();
      set(ref(db, 'NewOrders/' + order.id), null)
      .then(() => {
        onRemoveOrder(order.id)
      })
      .catch((error) => {
        // The write failed...
      });


      addToast({type: 'success', title: 'Sucesso', description: 'Pedido finalizado com sucesso'})
    }catch (e){
      addToast({type: 'danger', title: 'Erro ao finalizar pedido', description: (e as any).message})
    }
  }, [addToast, onRemoveOrder, order.id])

  const handleNotifyCustomer = useCallback(() => {
    const db = getDatabase();
    set(ref(db, 'NewOrders/' + order.id), {
      id: order.id,
      ready: true
    })
      .then(() => {
      })
      .catch((error) => {
        // The write failed...
      });
  }, [order.id]);

  return (
    <Card style={{marginBottom: 20}}>
      <Card.Header className="bg-secondary text-light">
        Novo pedido
      </Card.Header>

      <Card.Body>
        <Customer>
            Cliente: {order?.customer ? order.customer.cpf : "não identificado"} <br />
        </Customer>
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Quantidade</th>
              <th>Produto</th>
              <th>Preço em pontos</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {order?.orderProducts?.map(orderProduct => (
              <tr key={orderProduct.id}>
                <td>{orderProduct.quantity}</td>
                <td>{orderProduct.product.name}</td>
                <td>{orderProduct.product.priceInPoints}</td>
                <td>R$ {orderProduct.product.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>

      <Card.Footer>
        <ButtonsContainer>
          <Button onClick={handleNotifyCustomer}><FaBell /> Notificar cliente</Button>
          <Button variant="success" onClick={handleFinishOrder}><FaCheck /> Pedido retirado</Button>
        </ButtonsContainer>
      </Card.Footer>
    </Card>
  )
}

export default Notification;