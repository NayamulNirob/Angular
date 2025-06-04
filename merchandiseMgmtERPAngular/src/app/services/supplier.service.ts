// supplier.service.ts  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Supplier } from "../model/Supplier";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {



  private baseUrl = "http://localhost:8089/api/supplier";

  private suppliers: Supplier[] = [];

  private newSuppliers:Supplier=new Supplier();
  

  constructor(private http: HttpClient) { }

  loadSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.baseUrl+"/").pipe(
      tap(data => this.suppliers = data)
    );
  }

  getSuppliers(): Supplier[] {
    return this.suppliers;
  }

  getSupplier():Supplier{
    return this.newSuppliers;
  }



  addSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.baseUrl + "/save", supplier).pipe(
      tap(newSupplier => this.suppliers.push(newSupplier))
    );
  }



  updateSupplier(supplierId: number, updatedSupplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.baseUrl}/update/${supplierId}`, updatedSupplier);

  }

  removeSupplier(supplierId: number) {
    return this.http.delete(`${this.baseUrl}/delete/${supplierId}`, { responseType: 'text' });
  }

  filterSuppliers(searchTerm: string): Supplier[] {
    return this.suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  sortSuppliers(by: 'name' | 'contactPerson' | 'email'): Supplier[] {
    return this.suppliers.sort((a, b) => {
      if (a[by] < b[by]) return -1;
      if (a[by] > b[by]) return 1;
      return 0;
    });
  }



  private handleError(error: any) {
    console.error('An error occurred', error); // Log the error to the console  
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  getSupplierById(supplierId: number):Observable<any> {  
    return this.http.get<any>(`${this.baseUrl}/${supplierId}`); 
  }  
}

