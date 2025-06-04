import { Component } from '@angular/core';
import { Product } from "../../model/Product";
import { OrderItem } from "../../model/OrderItem";
import { Customer } from "../../model/Customer";
import { OrderService } from '../../services/ordermanagement.service';
import { ProductService } from '../../services/product.service';
import { CustomerService } from '../../services/customermanagement.service';

@Component({
  selector: 'app-ordermanagement',
  templateUrl: './ordermanagement.component.html',
  styleUrl: './ordermanagement.component.css'
})
export class OrdermanagementComponent {
  // order-management.component.ts  

  orders: OrderItem[] = [];
  filteredOrders: OrderItem[] = [];
  searchTerm: string = '';
  sortBy: 'customerName' | 'orderDate' | 'totalPrice' = 'customerName';
  newOrder: OrderItem = new OrderItem();
  products:Product[]=[];
  customers:Customer[]=[];

  constructor(
    private orderService: OrderService,
    private productService:ProductService,
    private customerService:CustomerService
  ) { }

  ngOnInit(): void {
    this.orderService.loadOrders().subscribe(data => {
      this.orders = data;
      this.filteredOrders = data; // Initialize filtered orders  
    });
    
    
  this.productService.getProducts().subscribe(data => {
    this.products  = data;
  });

  this.customerService.getCustomers().subscribe(data=>{
    this.customers=data;
  });
  }


  createOrder() {
    // Assign a simple unique ID (optional, as the server should handle this)  
    this.newOrder.orderDate = new Date();
    this.newOrder.totalPrice = this.newOrder.quantity * 20; // Assuming each item costs 20  
    this.newOrder.status="Pending";

    this.orderService.createOrder(this.newOrder).subscribe({
      next: () => {
        this.updateFilteredOrders(); // Refresh the displayed orders  
        this.resetNewOrder(); // Reset the form  
      },
      error: (err) => {
        console.error('Failed to create order: ', err); // Handle error  
      }
    });
  }

  // updateOrder(orderId: string, status: string) {
  //   this.orderService.updateOrder(orderId, { status });
  //   this.updateFilteredOrders();
  // }


  
  updateOrder(orderId: string, status: string) {
    if (status === 'Shipped') {
      this.orderService.updateOrder(orderId, { status }).subscribe({
        next: () => {
          this.updateFilteredOrders(); // Refresh the displayed orders
          alert('Order has been shipped and recorded in sales.');
        },
        error: (err) => {
          console.error('Failed to update order status: ', err); // Handle error
        }
      });
    }
  }
  

  // deleteOrder(orderId: string) {
  //   this.orderService.deleteOrder(orderId);
  //   this.updateFilteredOrders();
  // }

  deleteOrder(orderId: string) {  
    this.orderService.deleteOrder(orderId).subscribe({  
      next: () => {  
        this.updateFilteredOrders(); // Refresh the displayed orders  
      },  
      error: (err) => {  
        console.error('Failed to delete order: ', err); // Handle error  
      }  
    });  
}


  // filterOrders() {
  //   this.filteredOrders = this.orderService.filterOrders(this.searchTerm);
  // }

  // sortOrders() {
  //   this.filteredOrders = this.orderService.sortOrders(this.sortBy);
  // }

  private updateFilteredOrders() {
    this.filteredOrders = this.orderService.getOrders();
  }

  private resetNewOrder() {
    this.newOrder = new OrderItem();
  }

  
  // onProductChange() {
  //   if (this.newOrder.product) {
  //     const selectedProduct = this.products.find(p => p.id === this.newOrder.product.id);
  //     if (selectedProduct) {
  //       this.newOrder.product.price = selectedProduct.price;
  //     }
  //   }
  // }



}

