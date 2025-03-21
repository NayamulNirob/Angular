import { Component, Input, OnInit } from '@angular/core';
import { StudioService } from '../../service/studio.service';
import { Studio } from '../../model/studio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studio-list',
  standalone: false,
  templateUrl: './studio-list.component.html',
  styleUrl: './studio-list.component.css'
})
export class StudioListComponent implements OnInit {

  studios: Studio[] = [];
  selectedStudio: Studio | null = null;
  filteredStudios: Studio[] = [];
  searchQuery = '';
  autoCompleteList: string[] = [];
  radius = 10;

  constructor(private studioService: StudioService, private router: Router) { }

  ngOnInit(): void {
    this.loadStudios();
  }

  
  // loadStudios(): void {
  //   this.studioService.getStudios().subscribe(data => {
  //     this.studios = data;
  //   });
  // }

  loadStudios(): void {
    this.studioService.getStudios().subscribe(data => {
      this.studios = data;
      this.filteredStudios = data;
      this.autoCompleteList = [...new Set(data.map(studio => studio.Location.Area))];
    });
  }

  // filterStudios(): void {
  //   this.studioService.getStudios().subscribe(data => {
  //     this.studios = data.filter(studio =>
  //       studio.Location.Area.toLowerCase().includes(this.searchQuery.toLowerCase())
  //     );
  //   });
  // }

  filterStudios(): void {
    if (this.searchQuery) {
      this.filteredStudios = this.studios.filter(studio =>
        studio.Location.Area.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        studio.Location.City.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredStudios = this.studios;
    }
  }

  searchByRadius(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          this.filteredStudios = this.studios.filter(studio => {
            const studioLat = studio.Location.Coordinates.Latitude;
            const studioLon = studio.Location.Coordinates.Longitude;
            const distance = this.studioService.calculateDistance(userLat, userLon, studioLat, studioLon);
            return distance <= this.radius;
          });
        },
        error => {
          console.error('Error getting location', error);
          alert('Error getting location. Please enable location services and try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }


  selectStudio(studio: Studio): void {
    this.selectedStudio = studio;
  }

  // selectStudio(studio: Studio): void {
    
  //   this.selectedStudio = this.selectedStudio?.Id === studio.Id ? null : studio;
  // }

  closeBookingPopup(): void {
    this.selectedStudio = null;
  }

  trackById(index: number, studio: Studio): number {
    return studio.Id;
  }

  viewBookingList(): void {
    this.router.navigate(['/viewBookings']);
  }

  // getStars(rating: number): string {
  //   let stars = '';
  //   for (let i = 0; i < 5; i++) {
  //     stars += i < rating ? '<span class="star">★</span>' : '<span class="star text-secondary">☆</span>';
  //   }
  //   return stars;
  // }

  getStars(rating: number): string {
    let stars = '<span class="rating-label">Rating:</span> ';
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars += '<span class="star full">★</span>';
      } else if (i < rating) {
        stars += '<span class="star half">★</span>';
      } else {
        stars += '<span class="star empty">☆</span>';
      }
    }
    return `${stars} <span class='rating-text'>(${rating.toFixed(1)})</span>`;
  }
}

