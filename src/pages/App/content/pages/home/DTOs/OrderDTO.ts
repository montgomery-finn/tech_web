export default interface OrderDTO {
  id: string;
  customer?: {
    id: string;
    cpf: string;
  }
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
  }[]
}