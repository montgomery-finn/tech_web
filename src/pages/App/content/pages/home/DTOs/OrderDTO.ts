export default interface OrderDTO {
  ID: string;
  Customer?: {
    ID: string;
    CPF: string;
  }
  OrderProducts: {
    ID: string;
    Product: { 
      ID: string;
      Name: string;
      Price: number;
      PriceInPoints: number;
      FileName: string;
    }
    Quantity: number;
  }[]
}