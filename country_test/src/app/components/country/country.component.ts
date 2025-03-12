import { Component } from '@angular/core';
import { Country } from '../../mode/country';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent {

  countryId!: number;

  countries: Country[] = [];
  country: Country = new Country();

  constructor(private countryService: CountryService, private router: Router) { }


  ngOnInit(): void {
    this.getAllCountries();
  }

  getAllCountries() {
  this.countryService.getCountries().subscribe({
    next: (res: Country[]) => {
      this.countries = res;
    },
    error: (err: any) => {
      console.log(err);
    }
  });
  }


  saveCountry(): void {
    this.countryService.saveCountry(this.country).subscribe({
      next: () => {
       this.country = new Country();
       this.getAllCountries();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


  deleteCountry(countryId: number): void {
    if (countryId) {
      this.countryService.removeCountry(countryId).subscribe(success => {
        if (success) {
          this.getAllCountries();
        }
      });
    }
  }

  updateCountry(countryId: number): void {
    if(this.country){
      this.countryService.updateCountry(countryId, this.country).subscribe({
        next: () => {
          this.country = new Country();
          this.getAllCountries();
        }
      });
    }
  }

   getCountryById(countryId: number): void {
    this.countryService.getCountryById(countryId).subscribe({
      next: (res: Country) => {
        this.country = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  private reset(): void {
    this.country = new Country();
  }




}


