import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { tap } from 'rxjs/operators';  
import { Sale } from '../model/sale.model';
import { Supplier } from "../model/Supplier";
import { InventoryItem } from '../model/inventory.item.model';
import { Stock } from '../model/stockmodel';


@Injectable({  
  providedIn: 'root',  
})  
export class ReportsService {  

  // private baseUrl="http://localhost:3000/"

 
  private baseUrl="http://localhost:8089/api/"

  private inventory: InventoryItem[] = [];  
  private sales: Sale[] = [];  
  private suppliers: Supplier[] = [];  
  private stock:Stock[]=[];

  constructor(private http: HttpClient) {}  


  
  loadstocks(): Observable<Stock[]> {  
    return this.http.get<Stock[]>(this.baseUrl+"stock/").pipe(  
      tap(data => this.stock = data)  
    );  
  }  

  loadInventory(): Observable<InventoryItem[]> {  
    return this.http.get<InventoryItem[]>(this.baseUrl+"inventory/").pipe(  
      tap(data => this.inventory = data)  
    );  
  }  

  loadSales(): Observable<Sale[]> {  
    return this.http.get<Sale[]>(this.baseUrl+"sale/").pipe(  
      tap(data => this.sales = data)  
    );  
  }  

  loadSuppliers(): Observable<Supplier[]> {  
    return this.http.get<Supplier[]>(this.baseUrl+"supplier/").pipe(  
      tap(data => this.suppliers = data)  
    );  
  }  

  getStocks(): Stock[] {  
    return this.stock;  
  }  

  getInventory(): InventoryItem[] {  
    return this.inventory;  
  }  

  getSales(): Sale[] {  
    return this.sales;  
  }  

  getSuppliers(): Supplier[] {  
    return this.suppliers;  
  }  

  getSalesRevenueChartData(): { labels: string[], data: number[] } {  
    const labels = this.sales.map(sale => sale.productName);  
    const data = this.sales.map(sale => sale.totalPrice);  
    return { labels, data };  
  }  
}