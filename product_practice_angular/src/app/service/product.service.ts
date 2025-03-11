import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:8080/api/product";

  constructor(private http:HttpClient) { }


  getProductList():Observable<Product[]>{
    return this.http.get<Product[]>(this.url+"/get");
  }

  createProduct(product:Product):Observable<any>{
    return this.http.post(this.url+"/save",product);
  }

  editProduct(productId:number,updatedProduct:Product):Observable<Product>{
    return this.http.get<Product>(this.url+"/update/"+productId);
  }

  deleteProduct(productId:number):Observable<any>{
    return this.http.delete(this.url+"/delete/"+productId);
  }

  getByProductId(productId:number):Observable<Product>{
    return this.http.get<Product>(this.url+"/"+productId);
  }
}
