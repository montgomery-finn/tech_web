import React, { useState } from "react";
import { Name, HeaderContainer } from './styles';
import OrderDTO from '../../../../../../DTOs/OrderDTO';
import { Card, Table } from 'react-bootstrap';
import {parseISO, format} from 'date-fns';
import {Button} from 'react-bootstrap';

interface NotificationProps {
  order: OrderDTO;
}

const Notification: React.FC<NotificationProps> = ({ order }) => {

  const [more, setMore] = useState(false);
 
  return (
    <Card style={{marginBottom: 20}}>

      <Card.Header>
        <HeaderContainer>
          <Name>
              Cliente: {order?.customer ? order.customer.cpf : "não identificado"} <br />
          </Name>
          <Name>
              Atendente: {order?.user ? order.user.name : "não identificado"} <br />
          </Name>
          <Name>
            Data: { format(parseISO(order.createdAt), "dd/MM/yyyy")}
          </Name>
          <Button size="sm" onClick={() => setMore(v => !v)}>Ver produtos</Button>
        </HeaderContainer>
      </Card.Header>

      {more &&
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço em pontos</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {order?.orderProducts?.map(orderProduct => (
                <tr key={orderProduct.id}>
                  <td>{orderProduct.product.name}</td>
                  <td>{orderProduct.product.priceInPoints}</td>
                  <td>R$ {orderProduct.product.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      }
    </Card>
  )
}

export default Notification;