// inventory.service.ts  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from "../model/Product";
import { InventoryItem } from '../model/inventory.item.model';
import test from 'node:test';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = "http://localhost:8089/api/inventory";

  private inventories: InventoryItem = new InventoryItem();
  private newInventories: InventoryItem[] = []


  constructor(private http: HttpClient) { }


  loadInventories(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.baseUrl + "/");
  }

  addInventoryItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.baseUrl + "/save", item);
  }



  updateInventoryies(inventoryId: number, updatedInventories: InventoryItem): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.baseUrl}/update/${inventoryId}`, updatedInventories);

  }



  getInventoriesById(inventoryId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${inventoryId}`);
  }



  deleteInventoryItem(inventoryId: number) {
    return this.http.delete(`${this.baseUrl}/delete/${inventoryId}`, {responseType:'text'});
    
  }
 
 


  // manageLocation(productId: number, location: string): Observable<InventoryItem> {  
  //   const product = this.inventory.find(p => p.id === productId);  
  //   if (product) {  
  //     product.location = location;  
  //     return this.http.put<InventoryItem>(`${this.baseUrl}/${productId}`, product);  
  //   }  
  //   throw new Error('Product not found');  
  // } 


  // filterInventory(searchTerm: string): InventoryItem[] {  
  //   return this.inventory.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));  
  // }  

  // sortInventory(by: 'name' | 'stock' | 'price'): InventoryItem[] {  
  //   return this.inventory.sort((a, b) => {  
  //     if (a[by] < b[by]) return -1;  
  //     if (a[by] > b[by]) return 1;  
  //     return 0;  
  //   });  
  // }

  // deleteInventoryItem(productId: number): Observable<void> {  
  //   return this.http.delete<void>(`${this.baseUrl}/${productId}`).pipe(  
  //     tap(() => {  
  //       this.inventory = this.inventory.filter(item => item.id !== productId); // Update local inventory after deletion  
  //     })  
  //   );  
  // }  




}
