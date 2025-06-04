import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SubCategories } from '../model/subcategoriesmodel';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private baseUrl = "http://localhost:8089/api/subcategories";

  private subCategories: SubCategories = new SubCategories();

  private listSubCategories:SubCategories[]=[];


  constructor(private http: HttpClient) { }

  loadSubCategories(): Observable<SubCategories[]> {
    return this.http.get<SubCategories[]>(this.baseUrl+"/").pipe(
      tap(data => this.listSubCategories = data)
    );
  }

  getSubCategoriess(): SubCategories[] {
    return this.listSubCategories;
  }

  getSubCategories():SubCategories{
    return this.subCategories;
  }



  addSubCategories(subCategories: SubCategories): Observable<SubCategories> {
    return this.http.post<SubCategories>(this.baseUrl + "/save", subCategories);
    
  }



  updateSubCategories(subCategoriesId: number, updatedSubCategories: SubCategories): Observable<SubCategories> {
    return this.http.put<SubCategories>(`${this.baseUrl}/update/${subCategoriesId}`, updatedSubCategories);

  }

  removeSubCategories(subCategoriesId: number) {
    return this.http.delete(`${this.baseUrl}/delete/${subCategoriesId}`, { responseType: 'text' });
  }

  

  getSubCategoriesById(subCategoriesId: number):Observable<any> {  
    return this.http.get<any>(`${this.baseUrl}/${subCategoriesId}`); 
  }

}
