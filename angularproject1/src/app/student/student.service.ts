import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentModel } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl: string = "http://localhost:3000/students/";

  constructor(
    private http: HttpClient

  ) { }


  viewAllStudent(): Observable<any> {

    return this.http.get(this.baseUrl);

  }

  createStudent(student:StudentModel):Observable<StudentModel>{

    return this.http.post<StudentModel>(this.baseUrl,student);
  }

}
