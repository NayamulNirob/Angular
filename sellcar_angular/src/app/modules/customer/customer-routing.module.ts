import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashbordComponent } from './components/customer-dashbord/customer-dashbord.component';

const routes: Routes = [
  {path:"dashboard",component:CustomerDashbordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
