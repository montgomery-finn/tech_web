import React, { useCallback, useState } from "react";
import { ButtonsContainer, Button, Customer, Points } from './styles';
import OrderDTO from '../../../../../../DTOs/OrderDTO';
import { Card, Table, FormCheck } from 'react-bootstrap';
import { FaBell, FaCheck } from 'react-icons/fa'
import api from '../../../../../../services/api';
import { useToast } from "../../../../../../hooks/toast";
import { getDatabase, ref, set } from "firebase/database";
import {v4} from 'uuid';
import { useAuth } from "../../../../../../hooks/auth";

interface NotificationProps {
  order: OrderDTO;
  onRemoveOrder: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({ order, onRemoveOrder }) => {

  const { addToast } = useToast();

  const {user} = useAuth();

  const [usedPoints, setUsedPoints] = useState(0);


  const handleFinishOrder = useCallback(async () => {

    try{
      await api.post("Orders/Finish", { orderId: order.id, userId: user.id, usedPoints });

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
  }, [addToast, onRemoveOrder, order.id, usedPoints, user.id])

  const handleNotifyCustomer = useCallback(() => {
    const db = getDatabase();
    set(ref(db, 'NewOrders/' + order.id), {
      id: order.id,
      ready: v4()
    })
      .then(() => {
        addToast({type: "success", title:"Sucesso", description: "Cliente notificado com sucesso"})
      })
      .catch((error) => {
        // The write failed...
      });
  }, [addToast, order.id]);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  return (
    <Card style={{marginBottom: 20}}>
      <Card.Header className="bg-secondary text-light">
        Novo pedido
      </Card.Header>

      <Card.Body>
        <Customer>
            Cliente: {order?.customer ? order.customer.cpf : "não identificado"} <br />
        </Customer>
        {order.customer && (
          <>
            <Points>Pontos disponíveis: {order.customer?.points}</Points>
            <Points>Pontos utilizados: {usedPoints}</Points>
          </>
          )}
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço em pontos</th>
              <th>Preço</th>
              {order.customer && <th>Pagar com pontos?</th>}
            </tr>
          </thead>
          <tbody>
            {order?.orderProducts?.map(orderProduct => (
              <tr key={orderProduct.id}>
                <td>{orderProduct.product.name}</td>
                <td>{orderProduct.product.priceInPoints}</td>
                <td>R$ {orderProduct.product.price}</td>
                {order.customer && (
                  <td>
                    <FormCheck 
                      disabled={order.customer.points - usedPoints < orderProduct.product.priceInPoints && !selectedProducts.find(o => o ===orderProduct.id)}
                      
                      onChange={(event) => {
                        const value = event.currentTarget.checked;

                        if(value){
                          setUsedPoints(oldValue => oldValue += orderProduct.product.priceInPoints);
                          setSelectedProducts(oldValue => [...oldValue, orderProduct.id])
                        } else {
                          setUsedPoints(oldValue => oldValue -= orderProduct.product.priceInPoints);
                          setSelectedProducts(oldValue => oldValue.filter(p => p !== orderProduct.id))
                        }
                      }}
                    />
                  </td>)}
              </tr>
            ))}
          </tbody>
          <tfoot>
              <tr>
                <td colSpan={order.customer ? 3 : 2}>Total a receber:</td>
                <td>R$ {order.orderProducts.map(
                  o => selectedProducts.find(s => s === o.id) ? 0 : o.product.price
                  )
                  .reduce((accumulator, value) => (accumulator + value)).toFixed(2)}</td>
              </tr>
          </tfoot>
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