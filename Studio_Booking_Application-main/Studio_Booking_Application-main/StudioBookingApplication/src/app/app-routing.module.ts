import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudioListComponent } from './components/studio-list/studio-list.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';

const routes: Routes = [
  {path:'studio', component: StudioListComponent},
  {path:'bookings', component: BookingComponent},
  { path: '', redirectTo: '/studio', pathMatch: 'full' },
  {path:'viewBookings', component: BookingListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
