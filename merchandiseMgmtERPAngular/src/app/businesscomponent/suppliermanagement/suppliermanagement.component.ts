// supplier-management.component.ts  
import { Component, OnInit } from '@angular/core';  
import { Supplier } from "../../model/Supplier";
import { SupplierService } from '../../services/supplier.service';
import { Router } from '@angular/router';
import { Country } from '../../model/countrymodel';
import { CountryService } from '../../services/country.service';
import { DatePipe } from '@angular/common';



@Component({  
  selector: 'app-supplier-management',  
  templateUrl: './suppliermanagement.component.html',  
  styleUrls: ['./suppliermanagement.component.css'],
  providers: [DatePipe]
})  
export class SupplierManagementComponent implements OnInit {  
  suppliers: Supplier[] = [];  
  filteredSuppliers: Supplier[] = [];  
  searchTerm: string = '';  
  sortBy: 'name' | 'contactPerson' | 'email' = 'name';  
  newSupplier: Supplier = new Supplier(); 
  country:Country[]=[]; 

  constructor(private supplierService: SupplierService,
    private router:Router,
    private countryService:CountryService,
    private datePipe: DatePipe
  ) {}  

  ngOnInit(): void {  
    this.supplierService.loadSuppliers().subscribe(
      data => {  
      this.suppliers = data;  
      this.filteredSuppliers = data; 
      
    });
    this.countryService.getCountries().subscribe({
      next:res=>{
        this.country=res
      },
      error:err=>{
        console.log(err)
        alert(err)
      }
    });

  }  

  formatDateTime(date: Date | string) {
    return this.datePipe.transform(date, 'd MMM, y hh:mm:ss a');
  }

  addSupplier() {  
    this.newSupplier.createdAt = new Date();
    this.newSupplier.updatedAt = new Date(); 
    this.supplierService.addSupplier(this.newSupplier).subscribe(() => { 
      alert('Supplier saved successfully!'); 
      console.log();  
      this.updateFilteredSuppliers();  
      this.resetNewSupplier();  
    }); 
  }  



  updateSupplier(supplierId: number, ) {  
    this.router.navigate(['updatesupplier',supplierId]);
}
  

  removeSupplier(supplierId: number) {  
    this.supplierService.removeSupplier(supplierId).subscribe({  
      next: () => {  
        this.supplierService.loadSuppliers().subscribe(data => {  
          this.suppliers = data;  
          this.filteredSuppliers = data;  
        });  
      },  
      error: (err) => {  
        console.error('Delete failed', err); 
      }  
    });  
  }





  filterSuppliers() {  
    this.filteredSuppliers = this.supplierService.filterSuppliers(this.searchTerm);  
  }  

  sortSuppliers() {  
    this.filteredSuppliers = this.supplierService.sortSuppliers(this.sortBy);  
  }  

  private updateFilteredSuppliers() {  
    this.filteredSuppliers = this.supplierService.getSuppliers();  
  }  

  private resetNewSupplier() {  
    this.newSupplier = new Supplier();  
  }  
}
