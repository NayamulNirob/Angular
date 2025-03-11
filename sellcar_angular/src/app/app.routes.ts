import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/auth-components/login/login.component';
import { SignupComponent } from './auth/auth-components/signup/signup.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "registration", component: SignupComponent },
    { path: "admin", loadChildren: () => import('./modules/admin/admin.module').then(e => e.AdminModule) },
    { path: "customer", loadChildren: () => import('./modules/customer/customer.module').then(e => e.CustomerModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
