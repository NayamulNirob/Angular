import { Component, OnInit } from '@angular/core';
import { Customer } from "../../model/Customer";
import { CustomerService } from '../../services/customermanagement.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { Country } from '../../model/countrymodel';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-updatecustomer',
  templateUrl: './updatecustomer.component.html',
  styleUrl: './updatecustomer.component.css'
})
export class UpdatecustomerComponent implements OnInit{

customerId!:number;
errorMessage: string = '';
customer:Customer = new Customer();
customers:Customer[]=[];
countryObj:Country[]=[];

constructor(
  private customerService:CustomerService,
  private route:ActivatedRoute,
  private router:Router,
  private countryService:CountryService
){}

  ngOnInit(): void {
    this.customerId=this.route.snapshot.params['id'];
    console.log(this.customerId);
    this.loadCustomer();

  }
  loadCustomer(){
    this.customerService.getcustomerById(this.customerId).subscribe({
      next: response => {
        this.customer = response;
      },
      error: error => {
        console.log(error)
        this.errorMessage = 'Could not load Customer';
      }
    });
    this.countryService.getCountries().subscribe({
      next:res=>{
        this.countryObj=res
      },
      error:err=>{
        console.error(err)
      }
    });
  }

  updateCustomer(): void {
    if (this.customer) {
      this.customerService.updateCustomer(this.customerId, this.customer).subscribe({
        next: () => this.router.navigate(['/customer']),    
        error: (error: HttpErrorResponse) => {
          this.errorMessage = 'An error occurred while updating the product';
        }
      });
    }
  }




}
