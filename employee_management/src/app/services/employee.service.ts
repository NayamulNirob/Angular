import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8080/api/employee/";


  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'get');
  }


  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl + 'save', employee);
  }

  updateEmployee(employee: Employee, id: number): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}update/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseUrl}delete/${id}`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}${id}`);
  }


}
