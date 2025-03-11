import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';

const routes: Routes = [
  {path: "dashboard",component:AdminDashbordComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
