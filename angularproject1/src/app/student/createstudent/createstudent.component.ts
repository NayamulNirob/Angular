import { Component, OnInit } from '@angular/core';
import { Location } from '../../location/location.model';
import { StudentModel } from '../student.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../student.service';
import { LocationService } from '../../location.service';
import { error } from 'console';

@Component({
  selector: 'app-createstudent',
  templateUrl: './createstudent.component.html',
  styleUrl: './createstudent.component.css'
})
export class CreatestudentComponent implements OnInit {

  locations: Location[] = [];
  students: StudentModel[] = [];
  studentFrom!: FormGroup;
  student: StudentModel = new StudentModel();


  constructor(
    private studentService: StudentService,
    private locationService: LocationService,
    private fromBuilder: FormBuilder
  ) {


  }


  ngOnInit(): void {
    this.loadLocation();

    this.studentFrom = this.fromBuilder.group({
      name:[''],
      email:[''],
      cellNo:[''],
      location:[null]

    });

   
  }

  loadLocation() {
    this.locationService.getLocationForStudent()
      .subscribe({
        next: res => {
          this.locations = res;

        },
        error: error => {
          console.log(error);
        }




      });


  }

  createStudent(){
    this.student.name=this.studentFrom.value.name;
    this.student.email=this.studentFrom.value.email;
    this.student.cellNo=this.studentFrom.value.cellNo;
    this.student.location=this.studentFrom.value.location;

    this.studentService.createStudent(this.student)
    .subscribe({
      next: res => {
        this.loadLocation();
        this.studentFrom.reset();

      },

      error: error => {

        console.log(error);
      }

    });


}

  }




