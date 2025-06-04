import { Component } from '@angular/core';
import { Country } from '../../model/countrymodel';
import { Supplier } from "../../model/Supplier";
import { Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { SupplierService } from '../../services/supplier.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../model/UserModel.1';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent {

  countryId!: number;
  errorMessage: string = '';

  countries: Country[] = [];
  filteredCountries: Country[] = [];
  newCountry: Country = new Country();

  maxSale: number = 1000000;  // Example maximum sale value

  getProgressColor(percentage: number): string {
    if (percentage < 40) {
      return 'red';
    } else if (percentage >= 40 && percentage < 65) {
      return 'orange';
    } else {
      return 'green';
    }
  }


  searchTerm: string = '';
  sortBy: string = 'name'; // Default sort

  suppliers: Supplier[] = [];

  constructor(private countryService: CountryService,
    private router: Router,
    private supplierService: SupplierService,
    protected authService:AuthService) { }

  ngOnInit(): void {
    this.loadCountries();
    this.supplierService.loadSuppliers().subscribe({
      next: res => {
        this.suppliers = res
      },
      error: err => {
        alert(err);
        console.log(err);

      }
    });
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe({
      next: res => {
        this.countries = res;
        this.filterAndSortCountrys();
      },
      error: error => {
        console.log(error);
        alert(error);
      }
    });
  }

  filterCountrys(): void {
    this.filterAndSortCountrys();
  }

  filterAndSortCountrys(): void {
    // Filter the countries based on the search term
    this.filteredCountries = this.countries.filter(country =>
      country.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      country.bussiness.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Sort the filtered countries based on the selected sort criteria
    this.sortCountrys();
  }

  sortCountrys(): void {
    this.filteredCountries.sort((a, b) => {
      const aValue = a[this.sortBy as keyof Country];
      const bValue = b[this.sortBy as keyof Country];

      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });
  }







  addCountry(): void {

    this.countryService.addCountry(this.newCountry).subscribe({
      next: res => {
        this.newCountry = new Country();
        this.loadCountries();
        this.resetNewCountrys();
      },
      error: error => {
        console.log(error);
        alert(error);
      }
    });


  }

  editCountry(countryId: number) {
    if (this.newCountry) {
      this.countryService.updateCountry(this.countryId, this.newCountry).subscribe({
        next: () => this.router.navigate(['/country']),
        error: (error: HttpErrorResponse) => {
          this.errorMessage = 'An error occurred while updating the Country';
        }
      });
    }
  }



  deleteCountry(countryId: number): void {
    if (countryId) {
      this.countryService.removeCountry(countryId).subscribe(success => {
        if (success) {
          this.loadCountries();
        }
      });
    }
  }


  private resetNewCountrys() {
    this.newCountry = new Country();
  }

}
