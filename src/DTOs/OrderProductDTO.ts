export default interface OrderProductDTO {
  id: string;
  product: { 
    id: string;
    name: string;
    price: number;
    priceInPoints: number;
    fileName: string;
  }
}