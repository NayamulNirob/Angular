import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../service/booking.service';
import { Booking } from '../../model/booking';
import { Studio } from '../../model/studio';
import { StudioService } from '../../service/studio.service';

@Component({
  selector: 'app-booking-list',
  standalone: false,
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  studios: Studio[] = [];

  constructor(private bookingService: BookingService, private studioService: StudioService) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadStudios();
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe((data: Booking[]) => {
      this.bookings = data;
    });
  }

  loadStudios(): void {
    this.studioService.getStudios().subscribe((data: Studio[]) => {
      this.studios = data;
    });
  }

  getStudioName(studioId: number): string {
    const studio = this.studios.find(s => s.Id === studioId);
    return studio ? studio.Name : '';
  }

  getStudioType(studioName: string): string {
    const studio = this.studios.find(s => s.Name === studioName);
    return studio ? studio.Type : 'Unknown';
  }

  getStudioLocation(studioName: string): string {
    const studio = this.studios.find(s => s.Name === studioName);
    return studio ? `${studio.Location.City}, ${studio.Location.Area}` : 'Unknown';
  }
}
