import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { LocationService } from '../../location.service';
import { StudentModel } from '../student.model';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { error } from 'console';
import { Location } from '../../location/location.model';

@Component({
  selector: 'app-viewstudent',
  templateUrl: './viewstudent.component.html',
  styleUrl: './viewstudent.component.css'
})
export class ViewstudentComponent implements OnInit {
  students: StudentModel[] = [];
  locations: Location[] = [];

  constructor(

    private studentservice: StudentService,
    private locationService: LocationService,
    private router: Router
  ) {


  }

  ngOnInit(): void {
    this.loadData();
  }


  loadData(): void {
    forkJoin({
      locations: this.locationService.getLocationForStudent(),
      students: this.studentservice.viewAllStudent()
    }).subscribe({
      next: ({ locations, students }) => {
        this.locations = locations;
        this.students = students;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  deleteStudent(studentId: string): void {
    this.studentservice.deleteStudent(studentId).subscribe({

      next: res => {
        this.loadData();
      },
      error: error => {
        console.log(error);
      }
    });


  }

  editStudent(student: StudentModel): void {
    this.router.navigate(['updatestudent', student.id]);
  }

}
