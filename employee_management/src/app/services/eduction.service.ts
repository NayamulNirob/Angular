import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../model/education';

@Injectable({
  providedIn: 'root'
})
export class EductionService {

  constructor(private http:HttpClient) { }

  private baseUrl="http://localhost:8080/api/education/";


  getAllEducation():Observable<Education[]>{
    return this.http.get<Education[]>(this.baseUrl+'get');
  }


  addEducation(education:Education):Observable<Education>{
    return this.http.post<Education>(this.baseUrl+'save',education);
  }

  updateEducation(education:Education,id:number):Observable<Education>{
    return this.http.put<Education>(`${this.baseUrl}update${id}`,education);
  }

  deleteEducation(id:number):Observable<Education>{
    return this.http.delete<Education>(`${this.baseUrl}delete${id}`);
  }
}
