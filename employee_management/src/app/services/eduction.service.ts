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


  getAllEducation(){
    return this.http.get(this.baseUrl+'get');
  }


  addEducation(education:Education){
    return this.http.post(this.baseUrl+'save',education);
  }

  updateEducation(education:Education,id:number){
    return this.http.put(`${this.baseUrl}update${id}`,education);
  }

  deleteEducation(id:number){
    return this.http.delete(`${this.baseUrl}delete${id}`,{responseType:'text'});
  }
}
