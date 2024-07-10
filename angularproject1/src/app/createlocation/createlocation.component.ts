import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '../location/location.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { state } from '@angular/animations';
import { error } from 'console';

@Component({
  selector: 'app-createlocation',
  templateUrl: './createlocation.component.html',
  styleUrl: './createlocation.component.css'
})
export class CreatelocationComponent implements OnInit {

  loction: Location = new Location();
  fromValue !: FormGroup;
  locationData: any;

  constructor(

    private locationSrevice: LocationService,
    private router: Router,
    private httpClint: HttpClient,
    private formBuilder: FormBuilder,
    
  ) {

  }
  ngOnInit(): void {
    this.fromValue = this.formBuilder.group(
      {

        name: [''],
        city: [''],
        state: [''],
        photo: [''],
        availableUnits: [''],
        wifi: [false],
        laundry: [false]



      }
    )
  }

  careateLocation() {

    this.loction.name = this.fromValue.value.name;
    this.loction.city = this.fromValue.value.city;
    this.loction.state = this.fromValue.value.state;
    this.loction.photo = this.fromValue.value.photo;
    this.loction.availableUnits = this.fromValue.value.availableUnits;
    this.loction.wifi = this.fromValue.value.wifi;
    this.loction.laundry = this.fromValue.value.laundry;


    this.locationSrevice.creteLocation(this.loction)
      .subscribe(
        {
          next:res=>{
            console.log(res);
            this.fromValue.reset();
            this.router.navigate(['/location']);
          },
          error:error=>
          {
            console.log(error);
          }

        }
      );

      



  }

}
