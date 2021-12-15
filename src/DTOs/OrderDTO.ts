import OrderProductDTO from './OrderProductDTO';

export default interface OrderDTO {
  id: string;
  createdAt: string;
  customer?: {
    id: string;
    cpf: string;
    points: number;
  };
  orderProducts: OrderProductDTO[];
  user: {
    id: string;
    name: string;
    email: string;
  }
}