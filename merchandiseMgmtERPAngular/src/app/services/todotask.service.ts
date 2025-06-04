import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskStatus, TodoTask } from '../model/todotaskmodel';

@Injectable({
  providedIn: 'root'
})
export class TodotaskService {
  private baseUrl = "http://localhost:8089/api/task";


  constructor(private http: HttpClient) { }

  getTasks(): Observable<TodoTask[]> {
    return this.http.get<TodoTask[]>(this.baseUrl + "/");
  }



  addTask(description: string): Observable<TodoTask> {
    const task = { description, status: 'PENDING' };  
    return this.http.post<TodoTask>(`${this.baseUrl}/save`, task, { headers: { 'Content-Type': 'application/json' } });
  }


  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  markAsCompleted(id: number, status: TaskStatus): Observable<TodoTask> {
    const taskUpdate = { status }; 
    return this.http.put<TodoTask>(`${this.baseUrl}/update/${id}`, taskUpdate, {
      headers: { 'Content-Type': 'application/json' }
    });
  }



}
