import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transactionmodel';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
 

  private baseUrl = "http://localhost:8089/api/transaction";

  
  constructor(private http: HttpClient) { }

  loadTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl+"/");
  }



  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl + "/save", transaction);
  }



  updateTransaction(transactionId: number, updatedTransaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/update/${transactionId}`, updatedTransaction);

  }

  removeTransaction(transactionId: number) {
    return this.http.delete(`${this.baseUrl}/delete/${transactionId}`, { responseType: 'text' });
  }


  getTransactionById(transactionId: number):Observable<any> {  
    return this.http.get<any>(`${this.baseUrl}/${transactionId}`); 
  }  

  getTotalTransactionAmount(): Observable<number> {
    return this.http.get<number>(this.baseUrl + "/total");
  }

}
