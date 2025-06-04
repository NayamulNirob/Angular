import { Injectable, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  } from '../model/sale.model';
import { WareHouse } from '../model/warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService{
  

  private baseUrl = "http://localhost:8089/api/warehouse";

  constructor(private http: HttpClient) {}  

  
  // Method to get all WareHouses  
  getWarehouses(): Observable<WareHouse[]> {  
    return this.http.get<WareHouse[]>(this.baseUrl+"/");
  } 
 
  createWarehouses(wareHouse: WareHouse): Observable<WareHouse> {  
    return this.http.post<WareHouse>(this.baseUrl+"/save", wareHouse);  
  }  

  // Method to edit a WareHouse  
  editWarehouses(wareHouseId: number, updatedWareHouse: WareHouse): Observable<WareHouse> {  
    return this.http.put<WareHouse>(`${this.baseUrl}/update/${wareHouseId}`, updatedWareHouse);  
  }  

  // Method to delete a wareHouse  
  deleteWarehouses(wareHouseId: number) {  
    return this.http.delete(`${this.baseUrl}/delete/${wareHouseId}`, { responseType: 'text' });  
  }  
 

  // Method to get a wareHouse by ID  
  getWarehousesById(wareHouseId: number):Observable<any> {  
    return this.http.get<any>(`${this.baseUrl}/${wareHouseId}`); 
  }  

  
}
