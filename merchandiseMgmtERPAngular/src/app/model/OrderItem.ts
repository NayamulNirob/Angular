import { Customer } from "./Customer";
import { Product } from "./Product";



export class OrderItem {

  id!: string;
  quantity!: number;
  status!: string;
  orderDate!: Date;
  deliveryDate!: Date;
  totalPrice!: number;
  customer: Customer = new Customer();
  product: Product = new Product();
}
