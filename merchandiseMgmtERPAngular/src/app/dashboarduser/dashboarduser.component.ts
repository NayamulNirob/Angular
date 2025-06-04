
import { Component, OnInit } from '@angular/core';
import { Country } from '../model/countrymodel';
import { Sale } from '../model/sale.model';
import { Product } from "../model/Product";
import { OrderItem } from "../model/OrderItem";
import { ProductCategory } from '../model/productcategorymodel';
import { Transaction } from '../model/transactionmodel';
import { TaskStatus, TodoTask } from '../model/todotaskmodel';
import { UserdashboardService } from '../services/userdashboard.service';
import { SubCategories } from '../model/subcategoriesmodel';

@Component({
  selector: 'app-dashboarduser',
  templateUrl: './dashboarduser.component.html',
  styleUrl: './dashboarduser.component.css'
})
export class DashboarduserComponent implements OnInit{

  country: Country[] = [];
  orderItem: OrderItem[] = [];
  product: Product[] = [];
  sales: Sale[] = [];
  productCategory: ProductCategory[] = [];
  subCategories:SubCategories[]=[];
  selectedProduct: Product | null = null;
  transaction: Transaction[] = [];
  newTransaction: Transaction = new Transaction();
  totalAmount:number=0;

  tasks: TodoTask[] = [];
  newTask: string = '';


  constructor(
    private userDashbordService: UserdashboardService) { }

  ngOnInit(): void {
    this.loadCountries();
    this.loadOrders();
    this.loadProducts();
    this.loadCategory();
    this.loadTransactions();
    this.loadTasks();
    this.calculateTotalAmount();
    this.loadSubCategory();

  }




  loadTasks(): void {
    this.userDashbordService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (this.newTask.trim()) {
      this.userDashbordService.addTask(this.newTask).subscribe(() => {
        this.loadTasks();
        this.newTask = '';
      });
    }
  }

  

  deleteTask(id: number): void {
    this.userDashbordService.deleteTask(id).subscribe(() => this.loadTasks());
  }


  
  markAsCompleted(id: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const newStatus = isChecked ? TaskStatus.COMPLETED : TaskStatus.PENDING;
    this.userDashbordService.markAsCompleted(id, newStatus).subscribe(() => this.loadTasks());
}


private calculateTotalAmount(): void {
  this.totalAmount = this.transaction.reduce((sum, transaction) => {
    return sum + (transaction.amount || 0); 
  }, 0);
}

  loadTransactions() {
    this.userDashbordService.loadtransactions().subscribe({
      next: res => {
        this.transaction = res
      },
      error:err=>{
        console.log(err)
      }
    });
  }
  

loadSubCategory() {
    this.userDashbordService.loadSubCategories().subscribe({
      next: res => {
        this.subCategories = res
      },
      error: err => {
        console.error(err)
      }
    });
  }


  loadCategory() {
    this.userDashbordService.loadCategories().subscribe({
      next: res => {
        this.productCategory = res
      },
      error: err => {
        console.error(err)
      }
    });
  }

  generateSalesReport() {
    const totalRevenue = this.sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
    const totalSalesCount = this.sales.length;

    alert(`Total Sales Count: ${totalSalesCount}, Total Revenue: ${totalRevenue}`);


    //   document.getElementById('totalRevenue').innerText = `$${totalRevenue}`;
    // document.getElementById('totalSalesCount').innerText = `${totalSalesCount}`;
  }


  loadSales(): void {
    this.userDashbordService.loadSales().subscribe({
      next: res => {
        this.sales = res;
      },
      error: error => {
        console.log(error);
        alert(error);
      }
    });
  }


  // loadProducts(): void {
  //   this.userDashbordService.loadProducts().subscribe({
  //     next: res => {
  //       this.product = res;
  //     },
  //     error: error => {
  //       console.log(error);
  //       alert(error);
  //     }
  //   });
  // }

  // selectedProduct = this.product[0];


  loadProducts(): void {
    this.userDashbordService.loadProducts().subscribe({
      next: res => {
        this.product = res;
        if (this.product.length > 0) {
          this.selectedProduct = this.product[0]; // Set default selected product
        }
      },
      error: error => {
        console.log(error);
        alert(error);
      }
    });
  }

  updateSelectedProduct(event: any) {
    const activeIndex = event.to;
    this.selectedProduct = this.product[activeIndex];
  }





  loadCountries() {
    this.userDashbordService.loadCountries().subscribe({
      next: res => {
        this.country = res
      },
      error: err => {
        console.log(err);
      }
    });
  }

  maxSale: number = 1000000;  // Example maximum sale value

  getProgressColor(percentage: number): string {
    if (percentage < 40) {
      return 'red';
    } else if (percentage >= 40 && percentage < 65) {
      return 'orange';
    } else {
      return 'green';
    }
  }

  loadOrders() {
    this.userDashbordService.loadOrders().subscribe({
      next: res => {
        this.orderItem = res
      },
      error: err => {
        console.error(err)
      }
    });
  }
}
