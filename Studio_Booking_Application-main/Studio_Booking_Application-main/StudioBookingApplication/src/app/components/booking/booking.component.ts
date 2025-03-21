import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Studio } from '../../model/studio';
import { StudioService } from '../../service/studio.service';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../service/booking.service';
import { Booking } from '../../model/booking';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  @Input() studio!: Studio;
  @Output() close = new EventEmitter<void>();
  bookingDate!: string;
  bookingTime!: string;
  userName!: string;
  userEmail!: string;
  availableTimeSlots: string[] = [];

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.generateTimeSlots();
  }

  generateTimeSlots(): void {
    const openTime = this.studio.Availability.Open;
    const closeTime = this.studio.Availability.Close;
    const timeSlots = [];
    let currentTime = openTime;

    while (currentTime < closeTime) {
      timeSlots.push(currentTime);
      currentTime = this.addMinutes(currentTime, 30); // Add 30 minutes interval
    }

    this.availableTimeSlots = timeSlots;
  }

  addMinutes(time: string, minutes: number): string {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins);
    date.setMinutes(date.getMinutes() + minutes);
    const newHours = date.getHours().toString().padStart(2, '0');
    const newMinutes = date.getMinutes().toString().padStart(2, '0');
    return `${newHours}:${newMinutes}`;
  }

  checkAvailability(): boolean {
    // Check if the selected time slot is available
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return !bookings.some((booking: Booking) => 
      booking.studio === this.studio.Name &&
      booking.date === this.bookingDate &&
      booking.time === this.bookingTime
    );
  }

  bookNow() {
    if (!this.checkAvailability()) {
      alert('The selected time slot is not available. Please choose another time.');
      return;
    }

    const booking: Booking = {
      studio: this.studio.Name,
      date: this.bookingDate,
      time: this.bookingTime,
      user: { name: this.userName, email: this.userEmail }
    };

    // Save booking to the backend
    this.bookingService.saveBooking(booking).subscribe(
      response => {
        alert(`Booking Confirmed!\n\nStudio: ${booking.studio}\nDate: ${booking.date}\nTime: ${booking.time}\nName: ${booking.user.name}\nEmail: ${booking.user.email}`);
        this.router.navigate(['/viewBookings']);
        this.close.emit();
      },
      error => {
        console.error('Error saving booking', error);
        alert('Error saving booking. Please try again.');
      }
    );
  }

  closePopup() {
    this.close.emit();
  }
}
