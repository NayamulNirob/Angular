
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Sale } from '../model/sale.model';

@Injectable({  
  providedIn: 'root'  
})  
export class SalesService {  
  
  baseUrl = "http://localhost:8089/api/sale"
  
  private sales: Sale[] = []; 
  private newSale:Sale=new Sale(); 

  constructor(private http: HttpClient) {}  

  loadSales(): Observable<Sale[]> {  
    return this.http.get<Sale[]>(this.baseUrl+"/");
  }  

  addSales(item: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.baseUrl + "/save", item);
  }


  recordSale(sale: Sale) : Observable<Sale> {
    return this.http.post<Sale>(this.baseUrl + "/save", sale); 
  }  


  updateSale(saleId: number, updatedSale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.baseUrl}/update/${saleId}`, updatedSale);

  }



  removeSale(saleId: number) {  
    return this.http.delete(`${this.baseUrl}/delete/${saleId}`, {responseType:'text'});
  }  

  getSalesById(saleid:number): Observable<any> {  
    return this.http.get<any>(`${this.baseUrl}/${saleid}`);
  }  
  
  getSales(): Sale[] {  
    return this.sales;  
  }  


}