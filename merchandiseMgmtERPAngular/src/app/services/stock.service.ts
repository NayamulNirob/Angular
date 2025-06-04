import { Injectable } from '@angular/core';
import { Stock } from '../model/stockmodel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
private baseUrl="http://localhost:8089/api/stock"


  constructor(private http: HttpClient) {}  

  loadStocks(): Observable<Stock[]> {  
    return this.http.get<Stock[]>(this.baseUrl+"/");
  }  

  addStoks(item: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.baseUrl + "/save", item);
  }



  updateStoks(stokId: number, updatedStok: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.baseUrl}/update/${stokId}`, updatedStok);

  }



  removeStocks(stokId: number) {  
    return this.http.delete(`${this.baseUrl}/delete/${stokId}`, {responseType:'text'});
  }  



}
