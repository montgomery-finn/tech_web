export default interface OrderDTO {
  id: string;
  createdAt: string;
  customer?: {
    id: string;
    cpf: string;
  };
  orderProducts: {
    id: string;
    product: { 
      id: string;
      name: string;
      price: number;
      priceInPoints: number;
      fileName: string;
    }
    quantity: number;
  }[];
  user: {
    id: string;
    name: string;
    email: string;
  }
}