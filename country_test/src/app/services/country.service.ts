import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../mode/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

 private baseurl = 'http://localhost:8080/api/country/';

  getCountries():Observable<Country[]>{
    return this.http.get<Country[]>(this.baseurl+'get');
  }

  saveCountry(country:Country):Observable<Country>{
    return this.http.post<Country>(this.baseurl+'save',country);
  }

  updateCountry(id:number,country:Country):Observable<Country>{
    return this.http.put<Country>(`${this.baseurl}update/${id}`,country);
  }

  removeCountry(id:number):Observable<Country>{
    return this.http.delete<Country>(`${this.baseurl}delete/${id}`);
  }

  getCountryById(id:number):Observable<Country>{
    return this.http.get<Country>(`${this.baseurl}${id}`);
  }


}
