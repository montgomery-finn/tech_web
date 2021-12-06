
import OrderDTO from './OrderDTO';

export default interface NewOrderNotificationDTO {
  ID: string;
  OrderId: string;
  Order: OrderDTO;
}