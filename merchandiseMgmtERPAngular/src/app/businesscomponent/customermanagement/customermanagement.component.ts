// customer-management.component.ts  
import { Component, OnInit } from '@angular/core';
import { Customer } from "../../model/Customer";
import { CustomerService } from '../../services/customermanagement.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Country } from '../../model/countrymodel';
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'app-customer-management',
  templateUrl: './customermanagement.component.html',
  styleUrls: ['./customermanagement.component.css'],
  providers: [DatePipe]
})
export class CustomerManagementComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm: string = '';
  newCustomer: Customer = new Customer();
  countryObj:Country[]=[];

  constructor(private customerService: CustomerService,
    private router: Router,
    private datePipe: DatePipe,
    private countryService:CountryService
  ) { }

  
  formatDateTime(date: string | Date) {
    return this.datePipe.transform(date, 'd MMM, y hh:mm:ss a');
  }

  

  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer() {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
      this.filteredCustomers = data; 
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



  addCustomer() {

    this.customerService.addCustomer(this.newCustomer).subscribe({
      next: res => {
        
        alert('Customer saved successfully!');
        this.newCustomer.createdAt = new Date();
        this.newCustomer.updatedAt = new Date();
        this.loadCustomer();
      },
      error: error => {
        console.log('Error saving Customer:', error);
      }
    });
    this.updateFilteredCustomers();
    this.resetNewCustomer();
  }



  updateCustomer(customerId: number) {

    this.router.navigate(['updatecustomer',customerId]);
  }


  removeCustomer(customerId: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.removeCustomer(customerId).subscribe({
        next: (response) => {
          alert(response); 
          this.loadCustomer();
        },
        error: (error) => {
          alert('Error deleting customer: ' + error.error);
          console.log('Error deleting customer:', error);
        }
      });
    }
  }
  


  filterCustomers() {
    this.filteredCustomers = this.customerService.filterCustomers(this.searchTerm);
  }

  private updateFilteredCustomers() {
    // this.filteredCustomers = this.customerService.getCustomers();  
  }

  private resetNewCustomer() {
    this.newCustomer = new Customer();
  }
}