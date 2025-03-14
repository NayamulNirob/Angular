import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  private baseUrl="http://localhost:8080/api/employee/";


  getAllEmployee(){
      return this.http.get(this.baseUrl+'get');
    }

    
    addEmployee(employee:Employee){
      return this.http.post(this.baseUrl+'save',employee);
    }
  
    updateEmployee(employee:Employee,id:number){
      return this.http.put(`${this.baseUrl}update${id}`,employee);
    }
  
    deleteEmployee(id:number){
      return this.http.delete(`${this.baseUrl}delete${id}`,{responseType:'text'});
    }


}
