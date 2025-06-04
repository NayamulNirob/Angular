import { Injectable, NgModule } from '@angular/core';
import { Product } from "../model/Product";
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8089/api/product";

  constructor(private http: HttpClient) {}  
   
  getProducts(): Observable<Product[]> {  
    return this.http.get<Product[]>(this.baseUrl+"/");
  } 
 


  createProduct(product: Product, image: File): Observable<any> { 
    const fromData = new FormData();
    fromData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    fromData.append('image', image); 
    return this.http.post(this.baseUrl+"/save", fromData);  
  }  
  
  editProduct(productId: number, updatedProduct: Product): Observable<Product> {  
    return this.http.put<Product>(`${this.baseUrl}/update/${productId}`, updatedProduct);  
  }  

  deleteProduct(productId: number) {  
    return this.http.delete(`${this.baseUrl}/delete/${productId}`, { responseType: 'text' });  
  }  
  
  getProductById(productId: number):Observable<any> {  
    return this.http.get<any>(`${this.baseUrl}/${productId}`); 
  }  

  
}