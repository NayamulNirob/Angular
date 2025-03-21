import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Studio } from '../model/studio';



@Injectable({ providedIn: 'root' })
export class StudioService {
    

    constructor(private http: HttpClient) {}

    private apiUrl = 'http://localhost:3000/Studios';
    // private apiUrlbooking = 'http://localhost:3000/bookings';

    getStudios(): Observable<Studio[]> {
        return this.http.get<Studio[]>(this.apiUrl);
    }

    getStudio(id: number): Observable<Studio> {
        return this.http.get<Studio>(`${this.apiUrl}/${id}`);
    }

    addStudio(studio: Studio): Observable<Studio> {
        return this.http.post<Studio>(this.apiUrl, studio);
    }

    updateStudio(studio: Studio): Observable<Studio> {
        return this.http.put<Studio>(`${this.apiUrl}/${studio.Id}`, studio);
    }

    deleteStudio(id: number): Observable<Studio> {
        return this.http.delete<Studio>(`${this.apiUrl}/${id}`);
    }

    searchStudios(term: string): Observable<Studio[]> {
        return this.http.get<Studio[]>(`${this.apiUrl}?Location.Area_like=${term}`);
    }

    filterStudiosByCity(city: string): Observable<Studio[]> {
        return this.http.get<Studio[]>(`${this.apiUrl}?Location.City=${city}`);
    }

    filterStudiosByType(type: string): Observable<Studio[]> {
        return this.http.get<Studio[]>(`${this.apiUrl}?Type=${type}`);
    }

    // saveBooking(booking: any): Observable<any> {
    //     return this.http.post(`${this.apiUrl}/bookings`, booking);
    // }

    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Radius of the Earth in km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
}
