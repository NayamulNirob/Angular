import { Injectable } from '@angular/core';
import { Country } from '../model/countrymodel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = "http://localhost:8089/api/country"; 

  constructor(private http: HttpClient) {}  


  getCountries():Observable <Country[]> {  
    return this.http.get<Country[]>(this.baseUrl+"/");
  } 
  

  updateCountry(CountryId:number,updatedCountry:Country):Observable<Country>{
    return this.http.put<Country>(`${this.baseUrl}/update/${CountryId}`,updatedCountry);
  }
  
  
  addCountry(Country: Country): Observable<Country> {
    
    return this.http.post<Country>(this.baseUrl + "/save", Country);
  }
  

  removeCountry(CountryId: number) {  
    return this.http.delete(`${this.baseUrl}/delete/${CountryId}`, { responseType: 'text' }); 
  }
  
  getCountryById(CountryId: number):Observable<any> {  
    return this.http.get<any>(`${this.baseUrl}/${CountryId}`); 
  }  
 
}
