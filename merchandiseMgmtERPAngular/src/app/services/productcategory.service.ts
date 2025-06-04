import { Injectable } from '@angular/core';
import { ProductCategory } from '../model/productcategorymodel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {

  private baseUrl = "http://localhost:8089/api/category"


  constructor(private http: HttpClient) { }


  getProductCatagories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.baseUrl + "/");
  }

  createProductCategory(category: ProductCategory, image: File): Observable<any> {
    const fromData = new FormData();
    fromData.append('category', new Blob([JSON.stringify(category)], { type: 'application/json' }));
    fromData.append('image', image);

    return this.http.post(this.baseUrl + "/save", fromData);
  }

  editProductCategory(categoryId: number, updatedCategory: ProductCategory): Observable<ProductCategory> {
    return this.http.put<ProductCategory>(`${this.baseUrl}/update/${categoryId}`, updatedCategory);
  }

  deleteProductCategory(categoryId: number) {
    return this.http.delete(`${this.baseUrl}/delete/${categoryId}`, { responseType: 'text' });
  }



  getProductCategoryById(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${categoryId}`);
  }

  

}
