import { Customer } from "./Customer";
import { InventoryItem } from "./inventory.item.model";
import { OrderItem } from "./OrderItem";
import { Product } from "./Product";



export class Sale {
  id!: number;
  productName!: string;
  quantity!: number;
  price!: number;
  totalPrice!: number;
  customerName!: string;
  saleDate!: Date;
  product:Product=new Product();
  customer:Customer=new Customer();
  inventory:InventoryItem=new InventoryItem();
  orderItem:OrderItem=new OrderItem();
}



