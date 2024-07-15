import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { EmployeeComponent } from './employee/employee.component';
import { LocationComponent } from './location/location.component';
import { CreatelocationComponent } from './createlocation/createlocation.component';
import { UpdatelocationComponent } from './updatelocation/updatelocation.component';
import { ViewstudentComponent } from './student/viewstudent/viewstudent.component';
import { CreatestudentComponent } from './student/createstudent/createstudent.component';
import { UpdatestudentComponent } from './student/updatestudent/updatestudent.component';

const routes: Routes = [
  {path:"student", component:ViewstudentComponent},
  {path:"employee", component:EmployeeComponent},
  {path:"location", component:LocationComponent},
  {path:"createlocation", component:CreatelocationComponent},
  {path:"updateLocation/:id", component:UpdatelocationComponent},  
  {path:"createstudent", component:CreatestudentComponent},
  {path:"updatestudent/:id", component:UpdatestudentComponent}

    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
