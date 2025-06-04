// order.service.ts  
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { tap } from 'rxjs/operators';  
import { Product } from "../model/Product";
import { OrderItem } from "../model/OrderItem";
import { Customer } from "../model/Customer";
import { SalesService } from './sale.service';
import { Sale } from '../model/sale.model';
import { InventoryItem } from '../model/inventory.item.model';

@Injectable({  
  providedIn: 'root'  
})  
export class OrderService {  
  private baseUrl = "http://localhost:8089/api/order"; 
  private orders: OrderItem[] = [];  
  private order:OrderItem=new OrderItem();
  private products:Product =new Product()
  private customers:Customer =new Customer();

  constructor(private http: HttpClient,
    private salesService:SalesService
  ) {}  

  loadOrders(): Observable<OrderItem[]> {  
    return this.http.get<OrderItem[]>(this.baseUrl+"/").pipe(  
      tap(data => this.orders = data)  
    );  
  }  

  getOrders(): OrderItem[] {  
    return this.orders;  
  }  

  createOrder(order: OrderItem):Observable<OrderItem> {  
    return this.http.post<OrderItem>(this.baseUrl+"/save",order).pipe(
      tap(newOrder=>this.orders.push(newOrder))
    )  
  }  

  // updateOrder(orderId: string, updatedOrder: Partial<OrderItem>) {  
  //   const order = this.orders.find(o => o.id === orderId);  
  //   if (order) {  
  //     Object.assign(order, updatedOrder);  
  //   }  
  // }  

  updateOrder(orderId: string, updatedOrder: Partial<OrderItem>): Observable<OrderItem> {
    return new Observable(observer => {
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        Object.assign(order, updatedOrder);
  
        if (updatedOrder.status === 'Shipped') {
          // Create a sale entry for the shipped order
          this.createSaleFromOrder(order);
        }
  
        // Call backend to update order status
        this.http.put<OrderItem>(`${this.baseUrl}/update/${orderId}`, order).subscribe({
          next: (updatedOrderFromServer) => {
            observer.next(updatedOrderFromServer);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          }
        });
      }
    });
  }
  

  private createSaleFromOrder(order: OrderItem) {
    const sale: Sale = {
      id: 0, // Assuming backend will assign the ID
      productName: order.product.name,
      quantity: order.quantity,
      price: order.product.price,
      totalPrice: order.totalPrice,
      customerName: order.customer.name,
      saleDate: new Date(),
      product: order.product,
      customer: order.customer,
      inventory: new InventoryItem(),
      orderItem: new OrderItem()
    };
  
    this.salesService.recordSale(sale).subscribe({
      next: (newSale) => console.log("Sale recorded successfully", newSale),
      error: (err) => console.error("Failed to record sale", err)
    });
  }
  
  
  


  deleteOrder(orderId: string): Observable<OrderItem> {  
    return this.http.delete<OrderItem>(`${this.baseUrl}/${orderId}`).pipe(  
      tap(() => {  
        
        this.orders = this.orders.filter(o => o.id !== orderId);  
      })  
    );  
}


}