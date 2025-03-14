import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Observable, Subscription } from 'rxjs';
import { Employee } from '../../model/employee';
import { Education } from '../../model/education';
import { EductionService } from '../../services/eduction.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  employees: Employee[] = [];
  education: Education[] = [];

  employee: Employee = new Employee();

  constructor(private employeeservice: EmployeeService, private eductionservice: EductionService) { }

  ngOnInit(): void {
    this.loadEmployee();
    this.getAllEducation();
  }

  getAllEducation() {
    this.eductionservice.getAllEducation().subscribe({
      next: (res: Education[]) => {
        this.education = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


  loadEmployee() {
    this.employeeservice.getAllEmployee().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  addEmployee() {
    this.employeeservice.addEmployee(this.employee).subscribe({
      next: (res: Employee) => {
        this.loadEmployee();
        this.reset();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  removeEmployee(employeeId: number) {
    if (employeeId) {
      this.employeeservice.deleteEmployee(employeeId).subscribe(success => {
        if (success) {
          this.loadEmployee();
        }
      });
    }
  }

  updateEmployee(employeeId: number) {
    this.employeeservice.updateEmployee(this.employee, employeeId).subscribe({
      next: (res: Employee) => {
        this.loadEmployee();
        this.reset();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  getEmployeeById(employeeId: number) {
    this.employeeservice.getEmployeeById(employeeId).subscribe({
      next: (res: Employee) => {
        this.employee = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  private reset(): void {
    this.employee = new Employee();
  }




}


