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
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './guard/authguard.guard';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { RoleGuard } from './guard/role.guard';

const routes: Routes = [
  {path:"student", component:ViewstudentComponent,canActivate:[AuthguardGuard,RoleGuard],data:{role:'Admin,user'}},
  {path:"employee", component:EmployeeComponent,canActivate:[AuthguardGuard,RoleGuard],data:{role:'Admin'}},
  {path:"location", component:LocationComponent,canActivate:[AuthguardGuard,RoleGuard],data:{role:'user,Admin'}},
  {path:"createlocation", component:CreatelocationComponent,canActivate:[AuthguardGuard,RoleGuard],data:{role:'Admin'}},
  {path:"updateLocation/:id", component:UpdatelocationComponent,canActivate:[AuthguardGuard,RoleGuard],data:{role:'Admin'}},  
  {path:"createstudent", component:CreatestudentComponent,canActivate:[AuthguardGuard,RoleGuard],data:{role:'Admin'}},
  {path:"updatestudent/:id", component:UpdatestudentComponent,canActivate:[AuthguardGuard,RoleGuard],data:{role:'Admin'}},
  {path:"reg", component:RegistrationComponent},
  {path:"home", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"logout", component:LogoutComponent},
  {path:"Userprofile", component:UserprofileComponent,canActivate:[AuthguardGuard]},
  {
    path:'userProfile',
    component:UserprofileComponent,
    canActivate:[AuthguardGuard,RoleGuard],
    data:{role:['Admin','user']}
  },
  {path:"**", redirectTo:'login' , pathMatch:'full'},

    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
