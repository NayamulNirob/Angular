import { Component } from '@angular/core';
import { TaskStatus, TodoTask } from '../../model/todotaskmodel';
import { TodotaskService } from '../../services/todotask.service';

@Component({
  selector: 'app-todotask',
  templateUrl: './todotask.component.html',
  styleUrl: './todotask.component.css'
})
export class TodotaskComponent {


  tasks: TodoTask[] = [];
  newTask: string = '';

  constructor(private todoTaskService: TodotaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.todoTaskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (this.newTask.trim()) {
      this.todoTaskService.addTask(this.newTask).subscribe(() => {
        this.loadTasks();
        this.newTask = '';
      });
    }
  }

  

  deleteTask(id: number): void {
    this.todoTaskService.deleteTask(id).subscribe(() => this.loadTasks());
  }


  
  markAsCompleted(id: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const newStatus = isChecked ? TaskStatus.COMPLETED : TaskStatus.PENDING;
    this.todoTaskService.markAsCompleted(id, newStatus).subscribe(() => this.loadTasks());
}

  

}
